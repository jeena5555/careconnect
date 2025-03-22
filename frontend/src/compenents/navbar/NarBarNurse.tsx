import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Narbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt, faHospitalUser, faPills, faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";

import { getAccountById } from "../../services/account/getAccountById";

interface NavbarProps {
  textColor?: string;
}

interface Nurse {
  firstName: string;
  lastName: string;
}

const Navbar: React.FC<NavbarProps> = ({ textColor }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [doctor, setDoctor] = useState<Nurse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true";
      const accountId = Number(localStorage.getItem("accountId"));
      setIsLoggedIn(loggedIn);

      if (loggedIn && accountId) {
        try {
          const doctorData = await getAccountById(accountId);
          if (doctorData && doctorData.doctor) {
            setDoctor(doctorData.doctor);
          }
        } catch (error) {
          console.error("Error fetching doctor data:", error);
        }
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    console.log("ออกจากระบบสำเร็จ");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <button className="nav-item" style={{ color: textColor }} onClick={() => navigate("/patient-list")}>
        <FontAwesomeIcon icon={faHospitalUser} />
        <p>รายการผู้ป่วย</p>
      </button>
      <button className="nav-item" style={{ color: textColor }} onClick={() => navigate("/prescription")}>
        <FontAwesomeIcon icon={faPills} />
        <p>ใบสั่งยา</p>
      </button>
      <button className="nav-item" style={{ color: textColor }} onClick={() => navigate("/invoice")}>
        <FontAwesomeIcon icon={faFileInvoiceDollar} />
        <p>ใบเสร็จค่ารักษาพยาบาล</p>
      </button>
      <div className="login">
        {isLoggedIn ? (
          <div className="dropdown">
            <button className="nav-item" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <FontAwesomeIcon icon={faUser} />
              <p>
                {doctor ? `แพทย์ ${doctor.firstName} ${doctor.lastName}` : "บัญชีผู้ใช้"}
              </p>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <p>ออกจากระบบ</p>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className="nav-item" onClick={() => navigate("/login")}>
            <FontAwesomeIcon icon={faUser} />
            <p>เข้าสู่ระบบ</p>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
