import { apiClient } from "../apiClient";
import { getDepartmentById } from "../department/getDepartmentById";

interface AppointmentData {
  appointmentDate: Date;
  appointmentStartTime: string;
  appointmentEndTime: string;
  patientId: number;
  symptom: string;
  departmentId: number;
  doctorId: number;
}

interface Doctor {
  id: string;
  name: string;
  department: string;
  todayAppointments: number;
  totalAppointments: number;
}

// ฟังก์ชันนี้จะเลือกหมอที่มีคิวน้อยที่สุด
export const getDoctorWithFewestAppointments = async (departmentId: number) => {
  try {
    // ดึงข้อมูลแผนกพร้อมหมอทั้งหมด
    const department = await getDepartmentById(departmentId);

    if (!department || !department.doctors || department.doctors.length === 0) {
      console.error("ไม่พบหมอในแผนกนี้");
      return null;
    }

    // คำนวณหาหมอที่มีคิวน้อยที่สุด
    const selectedDoctor = department.doctors.reduce((minDoctor: Doctor, doctor: Doctor) => {
      const doctorAppointments = doctor.todayAppointments + doctor.totalAppointments;
      const minDoctorAppointments = minDoctor.todayAppointments + minDoctor.totalAppointments;
      return doctorAppointments < minDoctorAppointments ? doctor : minDoctor;
    });

    return selectedDoctor;
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการดึงข้อมูลหมอ:", error);
    return null;
  }
};

export const createAppointment = async (data: AppointmentData) => {
  try {
    let doctorId = data.doctorId;

    // เลือกหมอโดยอัตโนมัติจากแผนกถ้าไม่มี doctorId
    if (!doctorId) {
      const doctor = await getDoctorWithFewestAppointments(data.departmentId);

      if (!doctor) {
        throw new Error("ไม่สามารถเลือกหมอได้");
      }

      doctorId = doctor.id;
    }

    // ส่งข้อมูลการนัดหมายไปยัง API
    const appointmentData = {
      appointmentDate: data.appointmentDate,
      appointmentStartTime: data.appointmentStartTime,
      appointmentEndTime: data.appointmentEndTime,
      patientId: data.patientId,
      symptom: data.symptom,
      doctorId: doctorId,
    };

    console.log("Appointment Data in create Appointment:", appointmentData);

    return apiClient("/appointment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...appointmentData,
      }),
    });
  } catch (error) {
    console.error("เกิดข้อผิดพลาดในการสร้างนัดหมาย:", error);
    throw error;
  }
};
