import React, { useEffect, useState } from "react";
import { getPatients } from "../../services/patient/getPatients";
import "./PatientList.css";

import patientImg from "../../assets/patient-img.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const doctorId = localStorage.getItem("doctorId");
  const nurseId = localStorage.getItem("nurseId");
  const navigate = useNavigate(); // ✅ Initialize navigate function

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await getPatients();
      setPatients(response);
    };
    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toString().includes(searchTerm)
  );

  const handleNavigation = (accountId: string) => {
    if (doctorId) {
      navigate(`/appointment-by-doctor/${accountId}`);
    } else if (nurseId) {
      navigate(`/appointment/${accountId}`);
    }
  };

  return (
    <div>
      <div className="search-patient-input-container">
        <input
          type="text"
          placeholder="ค้นหาผู้ป่วย"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <section className="patient-list">
        {filteredPatients.map((patient) => (
          <div className="patient-card" key={patient.id}>
            <div className="patient-profile">
              <img src={patientImg} alt="Patient" className="profile-pic" />
              <h2>{patient.firstName} {patient.lastName}</h2>
              <p>รหัสผู้ป่วย {patient.id}</p>
            </div>
            <button className="book-appointment" onClick={() => handleNavigation(patient.accountId)}>
              <FontAwesomeIcon icon={faCalendarDays} /> นัดหมาย
            </button>
          </div>
        ))}
      </section>
    </div>
  );
};

export default PatientList;
