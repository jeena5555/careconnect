import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccountPatientById } from "../../services/patient/getAccountPatientById";
import "./PatientInfo.css";

import Button from "../button/Button";

import { updatePatient } from "../../services/patient/updatePatient";

export interface PatientInfoFormProps {
  accountId: number;
  isEditable?: boolean; // ✅ เพิ่ม prop กำหนดโหมด
}

const PatientInfoForm: React.FC<PatientInfoFormProps> = ({ accountId, isEditable = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    prefix: "",
    firstName: "",
    lastName: "",
    personalId: "",
    gender: "",
    nationality: "",
    dob: "",
    height: "",
    weight: "",
    bloodGroup: "",
    phone: "",
    address: "",
    allergy: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accountId) {
          console.log("No account ID provided");
          return;
        }

        const response = await getAccountPatientById(accountId);
        if (!response) {
          console.log("No data received from API");
          return;
        }

        // Only set the relevant fields in the state
        const filteredData = {
          id: response.id || "",
          prefix: response.prefix || "",
          firstName: response.firstName || "",
          lastName: response.lastName || "",
          personalId: response.personalId || "",
          gender: response.gender || "",
          nationality: response.nationality || "",
          dob: response.dob || "",
          height: response.height || "",
          weight: response.weight || "",
          bloodGroup: response.bloodGroup || "",
          phone: response.phone || "",
          address: response.address || "",
          allergy: response.allergy || ""
        };

        setFormData(filteredData);
      } catch (error) {
        console.error("Error fetching account data:", error);
      }
    };
    fetchData();
  }, [accountId]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isEditable) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      alert("กรุณากรอกชื่อและนามสกุล");
      return false;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      alert("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง");
      return false;
    }
    return true;
  };


  const formatPrefix = (prefix: string) => {
    if (prefix === "MISS") return "นางสาว";
    if (prefix === "MR") return "นาย";
    if (prefix === "MS") return "นาง";
    return prefix;
  };

  const formatGender = (gender: string) => {
    if (gender === "MALE") return "ชาย";
    if (gender === "FEMALE") return "หญิง";
    return gender;
  };

  const formatDob = (dob: string) => {
    return dob ? dob.split('T')[0] : "";
  };

  const handleUpdatePatient = async () => {
    if (!validateForm()) return;

    try {
      const response = await updatePatient(formData);
      if (!response.ok) throw new Error("เกิดข้อผิดพลาดในการอัปเดต");

      const result = await response.json();
      console.log("อัปเดตข้อมูลสำเร็จ:", result);
      alert("บันทึกข้อมูลเรียบร้อย");
      navigate(-1);
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("ไม่สามารถบันทึกข้อมูลได้");
    }
  };




  return (
    <div className="patient-info-container">
      <div className="patient-info-grid">
        <div>
          <label>คำนำหน้า</label>
          <input
            type="text"
            name="prefix"
            value={formatPrefix(formData.prefix)}
            readOnly
            className="patient-info-input"
          />
        </div>
        <div>
          <label>ชื่อ</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            readOnly={!isEditable}
            className="patient-info-input"
          />
        </div>
        <div>
          <label>นามสกุล</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            readOnly={!isEditable}
            className="patient-info-input"
          />
        </div>
        <div>
          <label>เพศ</label>
          <input
            type="text"
            name="gender"
            value={formatGender(formData.gender)}
            readOnly
            className="patient-info-input"
          />
        </div>
        <div>
          <label>วันเกิด</label>
          <input
            type="date"
            name="dob"
            value={formatDob(formData.dob)}
            onChange={handleChange}
            readOnly={!isEditable}
            className="patient-info-input"
          />
        </div>
        <div>
          <label>สัญชาติ</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            readOnly={!isEditable}
            className="patient-info-input"
          />
        </div>
        <div>
          <label>เลขบัตรประชาชน</label>
          <input
            type="text"
            name="personalId"
            value={formData.personalId}
            readOnly
            className="patient-info-input"
          />
        </div>
        <div>
          <label>เบอร์โทรศัพท์</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            readOnly={!isEditable}
            className="patient-info-input"
          />
        </div>
        <div>
          <label>กรุ๊ปเลือด</label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            readOnly
            className="patient-info-input"
          />
        </div>
        <div>
          <label>โรคประจำตัว</label>
          <input
            type="text"
            name="allergy"
            value={formData.allergy}
            onChange={handleChange}
            readOnly={!isEditable}
            className="patient-info-input"
          />
        </div>
        <div>
          <label>ความสูง</label>
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
            readOnly={!isEditable}
            className="patient-info-input"
          />
        </div>
        <div>
          <label>น้ำหนัก</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            readOnly={!isEditable}
            className="patient-info-input"
          />
        </div>
        <div className="patient-info-full-width">
          <label>ที่อยู่</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            readOnly={!isEditable}
            className="patient-info-input"
          />
        </div>
      </div>

      {/* ✅ แสดงปุ่มบันทึกเฉพาะเมื่อเป็นโหมดแก้ไข */}
      {isEditable && (
        <div className="patient-info-actions">
          <button className="cancel-profile-button" onClick={() => navigate(-1)}>ยกเลิก</button>
          <Button
            text="บันทึก"
            onClick={handleUpdatePatient}
          />
        </div>
      )}
    </div>
  );
};

export default PatientInfoForm;
