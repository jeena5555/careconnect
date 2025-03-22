import React, { useEffect, useState } from 'react';
import './css/Treatment.css';
import { useParams } from 'react-router-dom';  // Import useParams
import NarbarDoctor from "../compenents/navbar/NarBarDoctor";
import patientImg from "../assets/patient-img.png";
import { getAppointmentById } from '../services/appointment/getAppointmentById';

import PatientInfo from '../compenents/patient/PatientInfo';
import TreatmentHistory from '../compenents/treatment/TreatmentHistory';

const Treatment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [appointment, setAppointment] = useState<any>(null);

  useEffect(() => {
    console.log('Fetched ID:', id); // ตรวจสอบค่า id หลังจากรีเฟรชหน้า
    if (id) {
      const fetchAppointment = async () => {
        try {
          const data = await getAppointmentById(Number(id));
          console.log("Data received:", data);
          setAppointment(data);
        } catch (error) {
          console.error("Error fetching appointment:", error);
        }
      };

      fetchAppointment();
    }
  }, [id]); // ทำให้ useEffect ทำงานเมื่อ id เปลี่ยน


  return (
    <div>
      <NarbarDoctor textColor="#494949" />
      <hr style={{ borderTop: "1px solid #EBEBEB" }} />
      <div className="treatment-page">
        {appointment ? (
          <div className="treatment-profile-grid">
            <div className="profile-left">
              <div className="treatment-profile-card">
                <img src={patientImg} alt="patient" className="treatment-profile-image" />
                <button className="treatment-profile-button">ประวัติการรักษา</button>
              </div>

              <div className="treatment-appointment-card">
                <h2 className="treatment-section-title">รายละเอียดการนัดหมาย</h2>
                <div className="treatment-info-item">
                  <div className="info-value"><strong>อาการ: </strong>{appointment.symptom}</div>
                </div>

                <div className="treatment-info-item">
                  <div className="info-value"><strong>วันที่นัดหมาย: </strong>
                    {new Intl.DateTimeFormat("th-TH", { year: "numeric", month: "long", day: "numeric" }).format(new Date(appointment.appointmentDate))}
                  </div>
                </div>

                <div className="treatment-info-item">
                  <div className="info-value"><strong>เวลา: </strong>{appointment.appointmentStartTime} - {appointment.appointmentEndTime}</div>
                </div>
              </div>
            </div>

            <div className="profile-right">
              <h2 className="profile-title">ประวัติส่วนตัว</h2>
              <PatientInfo accountId={appointment.patient.accountId} isEditable={false} />
            </div>
          </div>
        ) : (
          <p className="loading-text">Loading...</p>
        )}

      </div>
      <div className="treatment-page">
          <TreatmentHistory appointmentId={Number(id)} />
      </div>
    </div>
  );
};


export default Treatment;
