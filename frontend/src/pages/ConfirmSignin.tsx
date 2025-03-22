import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAccountPatient } from "../services/account/createAccount";

import "./css/Confirm.css";

type PatientData = {
  accountName: string;
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
};

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const [nurseId, setNurseId] = useState<string | null>(null);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("patientData");
    if (storedData) {
      setPatientData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    const storedNurseId = localStorage.getItem("nurseId");
    setNurseId(storedNurseId);
  }, []);

  if (!patientData) return <p>Loading...</p>;

  const mapGender = (gender: string) => {
    const genderMap: Record<string, string> = {
      "ชาย": "MALE",
      "หญิง": "FEMALE",
    };
    return genderMap[gender] || gender;
  };

  const mapPrefix = (prefix: string) => {
    const prefixMap: Record<string, string> = {
      "นาย": "MR",
      "นาง": "MRS",
      "นางสาว": "MISS",
    };
    return prefixMap[prefix] || prefix;
  };


  const handleSubmit = async () => {
    if (!patientData) return;

    setLoading(true);
    setError(null);

    try {
      const requestData = {
        accountName: patientData.personalId,
        password: patientData.password,
        prefix: mapPrefix(patientData.prefix),
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        personalId: patientData.personalId,
        gender: mapGender(patientData.gender),
        nationality: patientData.nationality,
        dob: patientData.dob,
        height: Number(patientData.height),
        weight: Number(patientData.weight),
        bloodGroup: patientData.bloodGroup,
        phone: patientData.phone,
        address: patientData.address,
        allergy: patientData.allergy,
      };

      console.log("📤 ส่งข้อมูลไปยัง API:", requestData);
      const response = await createAccountPatient(requestData);
      console.log("✅ API Response:", response);


      alert("ลงทะเบียนสำเร็จ!");
      localStorage.removeItem("patientData");
      localStorage.removeItem("formData");

      if (nurseId) {
        navigate("/patient-list");
      } else {
        navigate("/login");
      }

    } catch (err) {
      setError("เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-confirm">
      <div className="details">
        <h2 className="confirm-title">ลงทะเบียนผู้ป่วยรายใหม่</h2>
        <div className="progress-container">
          <div className="step active">
            <div className="circle">1</div>
            <div className="label">รายละเอียด</div>
          </div>

          <div className="line"></div>

          <div className="step active">
            <div className="circle">2</div>
            <div className="label">ยืนยันข้อมูล</div>
          </div>
        </div>

        <div className="confirm-information">
          <p><strong>ชื่อ-นามสกุล:</strong> {patientData.prefix} {patientData.firstName} {patientData.lastName}</p>
          <p><strong>รหัสบัตรประชาชน:</strong> {patientData.personalId}</p>
          <p><strong>เบอร์โทร:</strong> {patientData.phone}</p>
          <p><strong>สัญชาติ:</strong> {patientData.nationality}</p>
          <p><strong>เพศ:</strong> {patientData.gender}</p>
          <p><strong>วันเกิด:</strong> {new Date(patientData.dob).toLocaleDateString()}</p>
          <p><strong>ส่วนสูง:</strong> {patientData.height} ซม.</p>
          <p><strong>น้ำหนัก:</strong> {patientData.weight} กก.</p>
          <p><strong>กรุ๊ปเลือด:</strong> {patientData.bloodGroup}</p>
          <p><strong>ภูมิแพ้:</strong> {patientData.allergy}</p>
          <p><strong>ที่อยู่:</strong> {patientData.address}</p>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="button-group-signin">
          <button onClick={() => navigate(-1)} className="edit-btn-signin">ย้อนกลับ</button>
          <button onClick={handleSubmit} className="submit-btn-signin" disabled={loading}>
            {loading ? "กำลังส่งข้อมูล..." : "ยืนยันข้อมูล"}
          </button>
        </div>
      </div>
    </div>
  );
}
