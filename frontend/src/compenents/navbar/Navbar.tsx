import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Narbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCalendarCheck, faUserDoctor, faPlus, faUser, faSignOutAlt, faHistory, faIdCard } from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
  textColor?: string;
}

const Navbar: React.FC<NavbarProps> = ({ textColor }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accountId");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("patientId");
    localStorage.removeItem("doctorId");
    localStorage.removeItem("nurseId");

    console.log("ออกจากระบบสำเร็จ");

    // ✅ นำทางกลับไปหน้าล็อกอิน
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <button className="nav-item" style={{ color: textColor }} onClick={() => navigate("/")}>
        <FontAwesomeIcon icon={faHouse} />
        <p>Home</p>
      </button>
      <button className="nav-item" style={{ color: textColor }} onClick={() => navigate("/search-doctor")}>
        <FontAwesomeIcon icon={faUserDoctor} />
        <p>ค้นหาแพทย์</p>
      </button>
      <button className="nav-item" style={{ color: textColor }} onClick={() => navigate("/appointment")}>
        <FontAwesomeIcon icon={faCalendarCheck} />
        <p>คิวพบแพทย์</p>
      </button>
      <button className="nav-item" style={{ color: textColor }} onClick={() => navigate("/contact")}>
        <FontAwesomeIcon icon={faPlus} />
        <p>ติดต่อเรา</p>
      </button>

      <div className="login">
        {isLoggedIn ? (
          <div className="dropdown">
            <button className="nav-item" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <FontAwesomeIcon icon={faUser} />
              <p>บัญชีผู้ใช้</p>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={() => navigate(`/account/${localStorage.getItem("accountId")}`)}>
                  <FontAwesomeIcon icon={faIdCard} />
                  <p>โปรไฟล์</p>
                </button>
                <button className="dropdown-item" onClick={() => navigate("/history")}>
                  <FontAwesomeIcon icon={faHistory} />
                  <p>ประวัติการรักษา</p>
                </button>
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

      {/* Mobile Menu Toggle Button */}
      <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <FontAwesomeIcon icon={faUser} />
      </button>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-dropdown">
          <button className="mobile-dropdown-item" onClick={() => navigate("/search-doctor")}>
            ค้นหาแพทย์
          </button>
          <button className="mobile-dropdown-item" onClick={() => navigate("/appointment")}>
            คิวพบแพทย์
          </button>
          <button className="mobile-dropdown-item" onClick={() => navigate("/contact")}>
            ติดต่อเรา
          </button>
          {isLoggedIn && (
            <>
              <button className="mobile-dropdown-item" onClick={() => navigate(`/account/${localStorage.getItem("accountId")}`)}>
                โปรไฟล์
              </button>
              <button className="mobile-dropdown-item" onClick={() => navigate("/history")}>
                ประวัติการรักษา
              </button>
              <button className="mobile-dropdown-item logout" onClick={handleLogout}>
                ออกจากระบบ
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
