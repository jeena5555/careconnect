import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/Appointment.css";


import Navbar from "../compenents/navbar/Navbar";
import { Calendar } from "../compenents/calendar/Carlendar";
import { TimeSlot } from "../compenents/time/TimeSlots";
import PatientInfo from "../compenents/patient/PatientInfo";

import { getAccountPatientById } from "../services/patient/getAccountPatientById";
import { createAppointment } from "../services/appointment/createAppointment";
import { getDoctorById } from "../services/doctor/getDoctorById";

import doctorImg from "../assets/doctor-img.png"

const morningSlots = [
  { startTime: "9:00", endTime: "10:00" },
  { startTime: "10:00", endTime: "11:00" },
  { startTime: "11:00", endTime: "12:00" },
];

const afternoonSlots = [
  { startTime: "13:00", endTime: "14:00" },
  { startTime: "14:00", endTime: "15:00" },
  { startTime: "15:00", endTime: "16:00" },
];

const steps = ["เริ่มต้น", "ข้อมูลการนัด", "ข้อมูลผู้ป่วย", "รอติดต่อกลับ"];

type DoctorData = {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
  description: string;
  phone: string;
  email: string;
};

const AppointmentDoctor: React.FC = () => {
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState<DoctorData>();
  const [step, setStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ startTime: string, endTime: string }>({ startTime: "", endTime: "" });
  const [symptom, setSymptom] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<any>(null);


  const accountId = Number(localStorage.getItem("accountId"));

  const formatPrefix = (prefix: string) => {
    if (prefix === "MISS") return "นางสาว";
    if (prefix === "MR") return "นาย";
    if (prefix === "MS") return "นาง";
    return prefix;
  };

  useEffect(() => {
    const fetchDoctorData = async () => {
      const doctorData = await getDoctorById(Number(doctorId));
      setDoctor(doctorData);
    };

    fetchDoctorData();
  }, [doctorId]);

  const handleCreateAppointment = async () => {
    try {

      // ตรวจสอบค่าเวลาที่เลือก
      if (!selectedDate || !selectedTimeSlot.startTime || !selectedTimeSlot.endTime) {
        alert("กรุณาเลือกวันและเวลา");
        return;
      }

      const patientId = await getAccountPatientById(accountId)

      const appointmentData = {
        appointmentDate: new Date(selectedDate),
        appointmentStartTime: selectedTimeSlot.startTime,
        appointmentEndTime: selectedTimeSlot.endTime,
        patientId: patientId.id,
        symptom,
        doctorId: Number(doctor?.id)
      };

      if (!doctor) {
        alert("ไม่พบข้อมูลแพทย์");
        return;
      }

      const appointmentResponse = await createAppointment(appointmentData);

      setAppointment(appointmentResponse)

      setStep(4);
      setIsModalOpen(false);
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการนัดหมาย กรุณาลองใหม่");
      console.error("Error creating appointment:", error);
    }
  };

  const handleNextStep = (nextStep: number) => {
    if (step === 2) {
      if (!selectedDate) {
        alert("กรุณาเลือกวันนัดหมาย");
        return;
      }
      if (!selectedTimeSlot.startTime || !selectedTimeSlot.endTime) {
        alert("กรุณาเลือกช่วงเวลา");
        return;
      }
      if (!symptom.trim()) {
        alert("กรุณากรอกอาการของผู้ป่วย");
        return;
      }
    }
    setStep(nextStep);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <div className="appointment__section">
              <h2 className="appointment__section-title">คุณได้เลือกแพทย์</h2>
              <div className="appointment-doctor">
                <div className="appointment-doctor-img">
                  <img src={doctorImg} alt="doctor-img" className="" />
                </div>
                <div className="appointment-doctor-detail">
                  <p>แพทย์: {doctor?.firstName} {doctor?.lastName}</p>
                  <p>แผนก: {doctor?.department.name}</p>
                  <p>รายละเอียด: {doctor?.description}</p>
                </div>
              </div>
            </div>
            <div className="appointment__buttons--next">
              <button
                  className="appointment__btn appointment__btn--back"
                  onClick={() => navigate(-1)}
                > ย้อนกลับ
                </button>
              <button
                className="appointment__btn appointment__btn--primary"
                onClick={() => setStep(2)}
              >
                ต่อไป
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <div className="appointment__section">
              <div className="appointment__specialty">
                <p className="main-specialty">คุณได้เลือกแพทย์: </p>
                <p className="specialty">แพทย์ {doctor?.firstName} {doctor?.lastName}</p>
              </div>
              <div className="grid-container">
                <div>
                  <h3>วันเวลาที่ต้องการนัด</h3>
                  <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
                </div>
                <div className="time-slots">
                  <div>
                    <h4>ก่อนเที่ยง</h4>
                    <div className="time-grid">
                      {morningSlots.map((slot) => (
                        <TimeSlot
                          key={slot.startTime}
                          startTime={slot.startTime}
                          endTime={slot.endTime}
                          isSelected={selectedTimeSlot.startTime === slot.startTime && selectedTimeSlot.endTime === slot.endTime}
                          onClick={() => setSelectedTimeSlot({ startTime: slot.startTime, endTime: slot.endTime })}
                        />

                      ))}
                    </div>
                  </div>
                  <div>
                    <h4>หลังเที่ยง</h4>
                    <div className="time-grid">
                      {afternoonSlots.map((slot) => (
                        <TimeSlot
                          key={slot.startTime}
                          startTime={slot.startTime}
                          endTime={slot.endTime}
                          isSelected={selectedTimeSlot.startTime === slot.startTime && selectedTimeSlot.endTime === slot.endTime}
                          onClick={() => setSelectedTimeSlot({ startTime: slot.startTime, endTime: slot.endTime })}
                        />

                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="appointment__symptom">
                <h3>อาการ</h3>
                <textarea
                  placeholder="อาการ และปัญหาสุจภาพของคุณ"
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                ></textarea>
              </div>
              <div className="appointment__buttons--next">
                <button
                  className="appointment__btn appointment__btn--back"
                  onClick={() => setStep(1)}
                >
                  ย้อนกลับ
                </button>
                <button
                  className="appointment__btn appointment__btn--primary"
                  onClick={() => handleNextStep(3)}
                >
                  ต่อไป
                </button>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <div className="appointment__section">
              <h2>ยืนยันการนัดหมาย</h2>
              <div className="appointment__specialty">
                <p className="main-specialty">คุณได้เลือก: </p>
                <p className="specialty">แพทย์ {doctor?.firstName} {doctor?.lastName}</p>
              </div>
              <div className="appointment__datetime">
                <p className="appointment__date">
                  {selectedDate ? new Date(selectedDate).toLocaleDateString("th-TH", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                  }) : ""}
                </p>
                <p className="appointment__time">
                  {selectedTimeSlot.startTime && selectedTimeSlot.endTime
                    ? `${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}`
                    : "กรุณาเลือกช่วงเวลา"}
                </p>
              </div>

              <div className="appointment__symptom_detail">
                <h2 className="appointment__section-title">อาการ</h2>
                <p>{symptom}</p>
              </div>

              <h2 className="appointment__section-title">ข้อมูลผู้ป่วย</h2>
              <PatientInfo accountId={accountId} isEditable={false} />
            </div>
            <div className="appointment__buttons--next">
              <button
                className="appointment__btn appointment__btn--back"
                onClick={() => setStep(2)}
              >
                ย้อนกลับ
              </button>
              <button
                className="appointment__btn appointment__btn--primary"
                onClick={() => setIsModalOpen(true)}
              >
                ยืนยันการนัดหมาย
              </button>
            </div>

            {isModalOpen && (
              <div className={`appointment__modal ${isModalOpen ? "appointment__modal--open" : ""}`}>
                <div className="appointment__modal-box">
                  <h2 className="appointment__modal-title">ยืนยันการนัดหมาย</h2>
                  <p className="appointment__modal-text">คุณแน่ใจหรือไม่ว่าต้องการยืนยันการนัดหมาย?</p>
                  <div className="appointment__modal-actions">
                    <button
                      className="appointment__modal-btn appointment__modal-btn--cancel"
                      onClick={() => setIsModalOpen(false)}
                    >
                      ยกเลิก
                    </button>
                    <button
                      className="appointment__modal-btn appointment__modal-btn--confirm"
                      onClick={handleCreateAppointment}
                    >
                      ยืนยัน
                    </button>
                  </div>
                </div>
              </div>
            )}


          </div>
        );

      case 4:
        return (
          <div>
            <div className="appointment__section">
              <p><strong>ผู้ป่วย: </strong>{formatPrefix(appointment.patient.prefix)} {appointment.patient.firstName} {appointment.patient.lastName}</p>
              <p><strong>แพทย์: </strong>{appointment.doctor.firstName} {appointment.doctor.lastName}</p>
              <p><strong>แผนก: </strong>{appointment.doctor.department.name}</p>
              <p><strong>วันที่นัดหมาย: </strong>{selectedDate ? new Date(selectedDate).toLocaleDateString("th-TH", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
              }) : ""}</p>
              <p><strong>เวลาที่นัดหมาย: </strong>{selectedTimeSlot.startTime && selectedTimeSlot.endTime
                ? `${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}`
                : "กรุณาเลือกช่วงเวลา"}</p>
            </div>
            <div className="appointment__buttons">
              <button
                className="appointment__btn appointment__btn--primary"
                onClick={() => navigate('/')}
              >
                กลับสู่หน้าหลัก
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar textColor="#494949" />
      <hr style={{ borderTop: "1px solid #EBEBEB" }} />
      <div className="appointment">
        <h1 className="appointment__title">ทำนัด</h1>

        <div className="appointment__tab">นัดหมายแพทย์</div>

        <div className="appointment__stepper">
          {steps.map((label, index, arr) => (
            <React.Fragment key={index}>
              <div
                className={`appointment__step ${step === index + 1 ? "appointment__step--active" : ""}`}
              >
                <div className="appointment__step-circle">{index + 1}</div>
                <p className="appointment__step-label">{label}</p>
              </div>
              {index < arr.length - 1 && <div className="appointment__step-line"></div>}
            </React.Fragment>
          ))}
        </div>

        {renderStepContent()}
      </div>
    </div>
  );
};

export default AppointmentDoctor;
