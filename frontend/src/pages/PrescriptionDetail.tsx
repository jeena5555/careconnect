import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/PrescriptionDetail.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import medicinePrescription from "../assets/medical-prescription.png";

import NavbarNurse from "../compenents/navbar/NarBarNurse";

import { getPrescriptionById } from "../services/prescription/getPrescriptionById";
import { getNurseById } from "../services/nurse/getNurseById";

import { updatePrescription } from "../services/prescription/updatePrescription";

const PrescriptionDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const nurseId = Number(localStorage.getItem("nurseId"));

  const [prescription, setPrescription] = useState<any>(null); // Store prescriptions
  const [nurse, setNurse] = useState<any>(); // Store nurse data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);


  useEffect(() => {
    const fetchPrescriptionDetail = async () => {
      try {
        const data = await getPrescriptionById(Number(id));
        setPrescription(data || []); // Handle null/undefined response

        console.log("Prescription data:", data)

        const nurseData = await getNurseById(nurseId);
        setNurse(nurseData);

      } catch (error) {
        console.error("Failed to fetch prescriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptionDetail();
  }, [id, nurseId]);

  const formatPrefix = (prefix: string) => {
    switch (prefix) {
      case "MISS":
        return "นางสาว";
      case "MR":
        return "นาย";
      case "MS":
        return "นาง";
      default:
        return prefix;
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  const formatStatus = (status: string) => {
    return status === "MedicationGiven"
      ? "จ่ายยาเรียบร้อย"
      : status === "MedicationNotGiven"
        ? "ยังไม่จ่ายยา"
        : status;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleConfirmPrescription = async () => {
    try {
      const response = await updatePrescription(prescription.id);

      if (response) {
        setIsConfirmModalOpen(false);
        navigate(-1);
      }
    } catch (error) {
      console.error("Error confirming prescription:", error);
      // Handle any error (e.g., show an error message)
    }
  };



  return (
    <div>
      <NavbarNurse textColor="#494949" />
      <hr style={{ borderTop: "1px solid #EBEBEB" }} />
      <main>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="prescription-detail-title" style={{ display: "flex" }}>
            <button className="back-btn-prescription" onClick={() => navigate(-1)} style={{ marginRight: 20 }}>
              <FontAwesomeIcon icon={faArrowLeft} /> รหัสใบสั่งยาที่ {prescription.id}
            </button>
            <p className={`prescription-status ${prescription.prescriptionStatus === "MedicationGiven" ? "status-given" : "status-not-given"}`}>
              {formatStatus(prescription.prescriptionStatus)}
            </p>
          </div>
        </div>

        <section className="prescription">
          <div className="prescription-header">
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
              <div style={{ display: "flex" }}>
                <img src={medicinePrescription} alt="prescription icon" className="prescription-detail-icon" />
                <div className="prescription-details">
                  <h3>รหัสใบสั่งยา {prescription.id}</h3>
                  <p>วันที่ออกใบสั่งยา : {formatDate(prescription.prescriptionDate)}</p>
                  <p className="patient-id-custom">รหัสผู้ป่วย : {prescription.appointment.patientId}</p>
                  <p><span className="patient-full-name-custom">ผู้ป่วย:{formatPrefix(prescription.appointment.patient.prefix)}{prescription.appointment.patient.firstName} {prescription.appointment.patient.lastName}</span></p>
                </div>
              </div>
              {prescription.prescriptionStatus !== "MedicationGiven" && <button className="blue-btn-customer" onClick={() => setIsConfirmModalOpen(true)}>ยืนยันการจัดยา</button>}
            </div>
          </div>

          <div className="prescription-info">
            <p>
              <strong>ออกใบสั่งยาโดย:</strong> {nurse.firstName} {nurse.lastName}
            </p>
            <p>
              <strong>จ่ายยาโดย:</strong> {prescription.appointment.doctor.firstName} {prescription.appointment.doctor.lastName}
            </p>
            <p>
              <strong>ข้อมูลเพิ่มเติม:</strong> {prescription.prescriptionDetail}
            </p>
          </div>

          <table className="medicine-table">
            <thead>
              <tr>
                <th>ลำดับ</th>
                <th>ID</th>
                <th>ชื่อยา</th>
                <th>จำนวน</th>
                <th>ประเภท</th>
                <th>วิธีการใช้ยา</th>
                <th>ระยะเวลา</th>
              </tr>
            </thead>
            <tbody>
              {prescription.prescriptionMedicines && prescription.prescriptionMedicines.map((prescriptionMedicines, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{prescriptionMedicines.medicine.id}</td>
                  <td>{prescriptionMedicines.medicine.name}</td>
                  <td>{prescriptionMedicines.quantity}</td>
                  <td>{prescriptionMedicines.medicine.type}</td>
                  <td>{prescriptionMedicines.medicine.instruction}</td>
                  <td>{prescriptionMedicines.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Modal ใบสั่งยา */}
      {isConfirmModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>ยืนยันการจัดยาเรียบร้อย</h2>

            <img src={medicinePrescription} alt="heartcare" className="heart-img"></img>

            <div className="modal-actions-confirm">
              <button
                className="modal-cancel-confirm"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="modal-submit-confirm"
                onClick={handleConfirmPrescription}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}

      </main>
    </div>
  );
};


export default PrescriptionDetail;
