import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/Appointment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStethoscope, faBaby, faEye, faPersonDress, faHand, faBone } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../compenents/navbar/Navbar";
import NarbarNurse from "../compenents/navbar/NarBarNurse"
import { Calendar } from "../compenents/calendar/Carlendar";
import { TimeSlot } from "../compenents/time/TimeSlots";
import PatientInfo from "../compenents/patient/PatientInfo";

import { getAccountPatientById } from "../services/patient/getAccountPatientById";
import { createAppointment } from "../services/appointment/createAppointment";

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

const appointmentOptions = [
  { id: 1, label: "กระดูกและข้อ", icon: faBone, value: "กระดูกและข้อ" },
  { id: 2, label: "เด็ก", icon: faBaby, value: "เด็ก" },
  { id: 3, label: "ตา หู คอ จมูก", icon: faEye, value: "ตา หู คอ จมูก" },
  { id: 4, label: "ผิวหนัง", icon: faHand, value: "ผิวหนัง" },
  { id: 5, label: "โรคทั่วไป", icon: faStethoscope, value: "โรคทั่วไป" },
  { id: 6, label: "ผู้หญิง", icon: faPersonDress, value: "ผู้หญิง" },
];

const steps = ["เริ่มต้น", "ข้อมูลการนัด", "ข้อมูลผู้ป่วย", "รอติดต่อกลับ"];

const Appointment: React.FC = () => {
  const navigate = useNavigate();
  const { patientId: paramPatientId } = useParams<{ patientId?: string }>();
  const nurseId = localStorage.getItem("nurseId");
  const [specialty, setSpecialty] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ startTime: string, endTime: string }>({ startTime: "", endTime: "" });
  const [symptom, setSymptom] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [appointment, setAppointment] = useState<any>(null);


  const accountId = paramPatientId ? Number(paramPatientId) : Number(localStorage.getItem("accountId"));

  const formatPrefix = (prefix: string) => {
    if (prefix === "MISS") return "นางสาว";
    if (prefix === "MR") return "นาย";
    if (prefix === "MS") return "นาง";
    return prefix;
  };

  const handleNextStep = (nextStep: number) => {
    if (step === 1) {
      if (!specialty) {
        alert("กรุณาเลือกความชำนาญเฉพาะทางก่อนดำเนินการต่อ");
        return;
      }
    }

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


  const handleCreateAppointment = async () => {
    try {
      // แปลง specialty เป็น departmentId
      const departmentId = appointmentOptions.find(option => option.value === specialty)?.id;
      if (!departmentId) throw new Error("ไม่พบแผนกที่เลือก");

      // ตรวจสอบค่าเวลาที่เลือก
      if (!selectedDate || !selectedTimeSlot.startTime || !selectedTimeSlot.endTime) {
        alert("กรุณาเลือกวันและเวลา");
        return;
      }

      const patientId = await getAccountPatientById(accountId)

      // สร้างข้อมูลการนัดหมาย
      const appointmentData = {
        appointmentDate: new Date(selectedDate),
        appointmentStartTime: selectedTimeSlot.startTime,
        appointmentEndTime: selectedTimeSlot.endTime,
        patientId: patientId.id,
        symptom,
        departmentId,
      };

      const appointmentResponse = await createAppointment(appointmentData);

      setAppointment(appointmentResponse)

      setStep(4);
      setIsModalOpen(false);
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการนัดหมาย กรุณาลองใหม่");
      console.error("Error creating appointment:", error);
    }
  };



  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <div className="appointment__section">
              <h2 className="appointment__section-title">ความชำนาญเฉพาะทาง</h2>
              <div className="appointment__grid">
                {appointmentOptions.map((item) => (
                  <button
                    key={item.value}
                    className={`appointment__option ${specialty === item.value ? "appointment__option--selected" : ""}`}
                    onClick={() => setSpecialty(item.value)}
                  >
                    {item.label}
                    <FontAwesomeIcon icon={item.icon} className="appointment__icon" />
                  </button>
                ))}
              </div>
            </div>
            <div className="appointment__buttons--next">
              <button
                  className="appointment__btn appointment__btn--back"
                  onClick={() => navigate(-1)}
                >
                  ย้อนกลับ
              </button>
              <button
                className="appointment__btn appointment__btn--primary"
                onClick={() => handleNextStep(2)}
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
                <p className="main-specialty">คุณได้เลือก: </p>
                <p className="specialty">{specialty}</p>
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
                <p className="specialty">{specialty}</p>
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
              <p><strong>แผนก: </strong>{specialty}</p>
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
                onClick={() => navigate(-1)}
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
      {nurseId ? <NarbarNurse textColor="#494949" /> : <Navbar textColor="#494949" />}
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

export default Appointment;
