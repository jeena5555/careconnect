import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Signin.css";

interface FormData {
  password: string;
  prefix: string;
  firstName: string;
  lastName: string;
  personalId: string;
  nationality: string;
  phone: string;
  gender: string;
  dob: string;
  height: string;
  weight: string;
  bloodGroup: string;
  allergy: string;
  address: string;
}

export default function PatientRegistration() {
  const navigate = useNavigate();
  const [nurseId, setNurseId] = useState<string | null>(null);

  // ✅ โหลดค่า `formData` จาก `localStorage` ครั้งเดียว
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const saved = localStorage.getItem("formData");
      return saved ? JSON.parse(saved) : {
        password: "",
        prefix: "",
        firstName: "",
        lastName: "",
        personalId: "",
        nationality: "",
        phone: "",
        gender: "",
        dob: "",
        height: "",
        weight: "",
        bloodGroup: "",
        allergy: "",
        address: "",
      };
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return {
        password: "",
        prefix: "",
        firstName: "",
        lastName: "",
        personalId: "",
        nationality: "",
        phone: "",
        gender: "",
        dob: "",
        height: "",
        weight: "",
        bloodGroup: "",
        allergy: "",
        address: "",
      };
    }
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const storedNurseId = localStorage.getItem("nurseId");
    setNurseId(storedNurseId);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("patientData", JSON.stringify(formData));
    navigate("/confirm");
  };

  return (
    <div className="container-singin">
      <div className="registration-box">
        <h2 className="signin-title">ลงทะเบียนผู้ป่วยรายใหม่</h2>
        <div className="progress-container">
          <div className="step active">
            <div className="circle">1</div>
            <div className="label">รายละเอียด</div>
          </div>

          <div className="line"></div>

          <div className="step inactive">
            <div className="circle">2</div>
            <div className="label">ยืนยันข้อมูล</div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <select className="signin-select" name="prefix" value={formData.prefix} onChange={handleChange} required>
              <option value="">คำนำหน้า</option>
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>
            <input className="signin-input" type="text" name="firstName" placeholder="ชื่อ" value={formData.firstName} onChange={handleChange} required />
            <input className="signin-input" type="text" name="lastName" placeholder="นามสกุล" value={formData.lastName} onChange={handleChange} required />
          </div>

          <div className="input-row">
            <input className="signin-input" type="text" name="personalId" placeholder="บัตรประชาชน" value={formData.personalId} onChange={handleChange} required />
            <input className="signin-input" type="text" name="password" placeholder="รหัสผ่าน" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="input-row">
            <input className="signin-input" type="text" name="nationality" placeholder="สัญชาติ" value={formData.nationality} onChange={handleChange} required />
            <input className="signin-input" type="text" name="phone" placeholder="เบอร์โทร" value={formData.phone} onChange={handleChange} required />
          </div>

          <div className="input-row">
            <select className="signin-select" name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">กรุณาเลือกเพศ</option>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
            </select>
            <input className="signin-input" type="date" name="dob" value={formData.dob} onChange={handleChange} required />
          </div>

          <div className="input-row">
            <input className="signin-input" type="text" name="height" placeholder="ส่วนสูง" value={formData.height} onChange={handleChange} required />
            <input className="signin-input" type="text" name="weight" placeholder="น้ำหนัก" value={formData.weight} onChange={handleChange} required />
          </div>

          <div className="input-row">
            <select className="signin-select" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
              <option value="">กรุ๊ปเลือด</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="O">O</option>
              <option value="AB">AB</option>
            </select>
            <input className="signin-input" type="text" name="allergy" placeholder="ภูมิแพ้" value={formData.allergy} onChange={handleChange} required />
          </div>

          <div className="input-row">
            <textarea className="signin-textarea" name="address" placeholder="ที่อยู่" value={formData.address} onChange={handleChange} required />
          </div>
          <button type="submit" className="submit-btn">ถัดไป</button>
          {!nurseId && (
            <p className="login-link">
              มีบัญชีอยู่แล้วใช่ไหม? <a href="/login">เข้าสู่ระบบ</a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
