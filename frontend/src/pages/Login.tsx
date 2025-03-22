import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import "./css/Login.css";
import { getAccounts } from "../services/account/getAccounts";

import loginImg from "../assets/login.png";

interface Account {
  accountName: string;
  password: string;
  id: number;
  role: string;
  patient?: { id: number };
  doctor?: { id: number };
  nurse?: { id: number };
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [accountName, setaccountName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const accountData = await getAccounts();

      const account = accountData.find(
        (account: Account) =>
          account.accountName === accountName && account.password === password
      );

      if (account) {
        localStorage.setItem("accountId", account.id.toString());
        localStorage.setItem("role", account.role);
        localStorage.setItem("isLoggedIn", "true");

        switch (account.role) {
          case "PATIENT":
            localStorage.setItem("patientId", account.patient?.id.toString());
            navigate("/");
            break;
          case "DOCTOR":
            localStorage.setItem("doctorId", account.doctor?.id.toString());
            navigate("/patient-q");
            break;
          case "NURSE":
            localStorage.setItem("nurseId", account.nurse?.id.toString());
            navigate("/patient-list");
            break;
          default:
            setError("ไม่พบบทบาทของบัญชีนี้");
        }
      } else {
        setError("รหัสบัตรประชาชนหรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเข้าสู่ระบบ:", error);
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  return (
    <div className="container-login">
      <img src={loginImg} alt="loginImg" className="login-img" />
      <div className="login-box">
        <h2 className="login-title">เข้าสู่ระบบ</h2>
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="user-icon" />
          <input
            className="login-input"
            type="text"
            placeholder="กรอกรหัสบัตรประชาชน"
            value={accountName}
            onChange={(e) => setaccountName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="lock-icon" />
          <input
            className="login-input"
            type="password"
            placeholder="กรอกรหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button className="login-btn" onClick={handleLogin}>
          เริ่มต้นการใช้งาน
        </button>
        <p className="register-link">
          ยังไม่มีบัญชีใช่ไหม? <a href="/signup">สร้างบัญชี</a>
        </p>
      </div>
    </div>
  );
}
