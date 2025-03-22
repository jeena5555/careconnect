import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAppointmentByDoctor } from "../../services/appointment/getAppointmentByDoctor";
import "./PatientList.css";
import { getAppointments }  from "../../services/appointment/getAppointments";

import patientImg from "../../assets/patient-img.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const AppointmentPatient = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectedAppointment, setSelectedAppointment] = useState(null); // ใช้เก็บข้อมูลการนัดหมายที่เลือก
  const [isModalOpen, setIsModalOpen] = useState(false); // ควบคุม Modal

  const formatPrefix = (prefix: string) => {
    if (prefix === "MISS") return "นางสาว";
    if (prefix === "MR") return "นาย";
    if (prefix === "MS") return "นาง";
    return prefix;
  };

  useEffect(() => {
    const fetchAppointment = async () => {
      const doctorId = localStorage.getItem("doctorId");
      const nurseId = localStorage.getItem("nurseId");

      let response = [];

      if (doctorId) {
        response = await getAppointmentByDoctor(Number(doctorId));
      } else if (nurseId) {
        response = await getAppointments();
      }

      if (response.length > 0) {
        setAppointments(response);
        filterAppointmentsByDate(response, selectedDate);
      }
    };

    fetchAppointment();
  }, []);


  useEffect(() => {
    filterAppointmentsByDate(appointments, selectedDate);
  }, [selectedDate, appointments]);

  const filterAppointmentsByDate = (appointments, selectedDate) => {
    const filtered = appointments
      .filter((appointment) => {
        const appointmentDate = new Date(appointment.appointmentDate).toISOString().split("T")[0];
        return appointmentDate === selectedDate;
      })
      .sort((a, b) => a.appointmentStartTime.localeCompare(b.appointmentStartTime));

    setFilteredAppointments(filtered);
  };

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div>
      <div className="filter-section">
        <label>เลือกวันที่: </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>
      <section className="patient-list">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div className="patient-card" key={appointment.id}>
              <div className="patient-profile">
                <img src={patientImg} alt="Patient" className="profile-pic" />
                <h2>
                  {formatPrefix(appointment.patient.prefix)} {appointment.patient.firstName} {appointment.patient.lastName}
                </h2>
                <p>รหัสการนัดหมาย: {appointment.id}</p>
                <button className="edit-btn-appointment" onClick={() => openModal(appointment)}>
                  ข้อมูลการนัดหมาย
                </button>
              </div>
              <button className="book-appointment">
                <FontAwesomeIcon icon={faCalendarDays} /> {appointment.appointmentStartTime} -{" "}
                {appointment.appointmentEndTime}
              </button>
            </div>
          ))
        ) : (
          <p>ไม่มีนัดหมายในวันที่เลือก</p>
        )}
      </section>

      {/* Modal */}
      {isModalOpen && selectedAppointment && (
        <div className={`modal-overlay modal-${selectedAppointment.id}`}>
          <div className={`modal-content modal-${selectedAppointment.id}`}>
            <h2>รายละเอียดการนัดหมาย</h2>
            <p><strong>ผู้ป่วย:</strong> {formatPrefix(selectedAppointment.patient.prefix)} {selectedAppointment.patient.firstName} {selectedAppointment.patient.lastName}</p>
            <p><strong>เวลา:</strong> {selectedAppointment.appointmentStartTime} - {selectedAppointment.appointmentEndTime}</p>
            <p><strong>รายละเอียด:</strong> {selectedAppointment.symptom}</p>
            <button className="close-btn-appointment" onClick={closeModal}>ยกเลิก</button>
            {/* Check if treatment exists, then show corresponding button */}
            {selectedAppointment.treatment ? (
              <button className="done-appointment" disabled>รักษาเรียบร้อยแล้ว</button>
            ) : (
              <button className="next-btn-appointment" onClick={() => navigate(`/treatment/${selectedAppointment.id}`)}>เริ่มการรักษา</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentPatient;
