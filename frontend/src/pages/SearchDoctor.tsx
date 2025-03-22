import React, { useEffect, useState } from "react";
import "./css/SearchDoctor.css";
import Navbar from "../compenents/navbar/Navbar";
import { getDepartments } from "../services/department/getDepartments";
import { getDoctors } from "../services/doctor/getDoctors";

import doctorImg from "../assets/doctor-img.png";
import Button from "../compenents/button/Button";
import handleBookAppointment from "./Appointment";

import { getDoctorById } from "../services/doctor/getDoctorById";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBone, faBaby, faEye, faHand, faStethoscope, faPersonDress } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

type DepartmentData = {
  id: number;
  name: string;
};

export type DoctorData = {
  id: number;
  firstName: string;
  lastName: string;
  departmentName: string;
  description: string;
  phone: string;
  email: string;
};

const getDepartmentClass = (departmentName: string) => {
  switch (departmentName) {
    case "กระดูก":
      return "dept-bone";
    case "เด็ก":
      return "dept-baby";
    case "ตา หู คอ จมูก":
      return "dept-eyes";
    case "ผิวหนัง":
      return "dept-skin";
    case "โรคทั่วไป":
      return "dept-general";
    case "ผู้หญิง":
      return "dept-women";
    default:
      return "dept-default";
  }
};

const getIconDepartment = (departmentName: string) => {
  switch (departmentName) {
    case "กระดูก":
      return faBone;
    case "เด็ก":
      return faBaby;
    case "ตา หู คอ จมูก":
      return faEye;
    case "ผิวหนัง":
      return faHand;
    case "โรคทั่วไป":
      return faStethoscope;
    case "ผู้หญิง":
      return faPersonDress;
  }
};

const Appointment: React.FC = () => {
  const [departments, setDepartments] = useState<DepartmentData[]>([]);
  const [doctors, setDoctors] = useState<DoctorData[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorData | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("ทั้งหมด");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await getDepartments();
      setDepartments(response || []);
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await getDoctors();
      setDoctors(response || []);
    };
    fetchDoctors();
  }, []);

  const getDataDoctorById = async (doctorId: number) => {
    const response = await getDoctorById(doctorId);
    if (response) {
      setSelectedDoctor(response);
    }
  };


  const filteredDoctors = doctors.filter((doctor) => {
    const matchesDepartment = selectedDepartment === "ทั้งหมด" || doctor.departmentName === selectedDepartment;
    const matchesSearch = `${doctor.firstName} ${doctor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  return (
    <div>
      <Navbar textColor="#494949" />
      <hr style={{ borderTop: "1px solid #EBEBEB" }} />
      <div className="search-doctor-title">
        <h1>รายชื่อแพทย์</h1>
        <div className="search-input-container">
          <input
            type="text"
            placeholder="ค้นหาแพทย์"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* department name */}
      <p className="search-doctor-description">รายชื่อแพทย์ทั้งหมดที่ประจำการอยู่ในโรงพยาบาล Care Connect</p>
      <div className="department-list">
        <a
          className={`department-item ${selectedDepartment === "ทั้งหมด" ? "active" : ""}`}
          onClick={() => setSelectedDepartment("ทั้งหมด")}
        >
          ทั้งหมด
        </a>
        {departments.map((dept) => (
          <a
            key={dept.id}
            className={`department-item ${selectedDepartment === dept.name ? "active" : ""}`}
            onClick={() => setSelectedDepartment(dept.name)}
          >
            <FontAwesomeIcon icon={getIconDepartment(dept.name)} /> {dept.name}
          </a>
        ))}
      </div>

      <div className="doctor-container">
        <div className="doctor-list">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="doctor-item">
              <img src={doctorImg} alt="doctor-img" className="icon doctor-img" />
              <div className="doctor-info">
                <div className="doctor-name">
                  <p className="doctor-full-name">
                    {doctor.firstName} {doctor.lastName}
                  </p>
                  <p className={getDepartmentClass(doctor.departmentName)}> {doctor.departmentName}</p>
                </div>
              </div>
              <div className="doctor-appointment">
                <Button text="นัดหมาย" onClick={() => navigate(`/appointment-doctor/${doctor.id}`)} />
                <button
                  className="detail-more-doctor"
                  onClick={() => getDataDoctorById(doctor.id)}
                >
                  รายละเอียด
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {selectedDoctor && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>รายละเอียดแพทย์</h2>
            <p><strong>แพทย์:</strong> {selectedDoctor.firstName} {selectedDoctor.lastName}</p>
            <p><strong>แผนก:</strong> {selectedDoctor.department.name}</p>
            <p><strong>รายละเอียด:</strong> {selectedDoctor.description}</p>
            <p><strong>เบอร์โทร:</strong> {selectedDoctor.phone}</p>
            <p><strong>อีเมล:</strong> {selectedDoctor.email}</p>
            <button onClick={() => setSelectedDoctor(null)} className="modal-close">ปิด</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointment;
