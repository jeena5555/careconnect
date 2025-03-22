import React, { useEffect, useState } from "react";
import "./css/History.css";

import Navbar from "../compenents/navbar/Navbar";
import historyImg from "../assets/appointment-history.png";
import { getAppointmentByPatient } from "../services/appointment/getAppointmentByPatient"; // นำเข้า API

const MedicalHistory = () => {
  const [historys, setHistorys] = useState([]);

  const statusMap: Record<string, string> = {
    Treated: "ได้รับการรักษาแล้ว",
    NotTreated: "ยังไม่ได้รับการรักษา",
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const patientId = localStorage.getItem('patientId');
        const response = await getAppointmentByPatient(Number(patientId));
        console.log(response);
        setHistorys(response);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div>
      <Navbar textColor="#494949" />
      <hr style={{ borderTop: "1px solid #EBEBEB" }} />
      <div className="history-container">
        <h1 className="history-title">ประวัติการรักษา</h1>
        <div className="history-list">
          {historys.length > 0 ? (
            historys.map((history) => (
              <div key={history.id} className="history-card">
                <img src={historyImg} alt="history-img" className="icon history-icon" />
                <div className="history-details">
                  <div className="history-main">
                    <p className="history-number">หมายเลขนัดหมายที่ {history.id}</p>
                    <div className="history-status">
                      <span className={`history-status ${history.appointmentStatus}`}>
                        {statusMap[history.appointmentStatus] || "ไม่ทราบสถานะ"}
                      </span>
                    </div>
                  </div>
                  <p className="history-date">วันที่นัดหมาย: {formatDate(history.appointmentDate)}</p>
                  <p className="history-result">ผลวินิจฉัย: {history.symptom}</p>
                  <p className="history-doctor">แพทย์ {history.doctor.firstName} {history.doctor.lastName}</p>
                </div>
              </div>
            ))
          ) : (
            <p>ไม่มีข้อมูลการนัดหมาย</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
