import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Prescription.css";

import medicinePrescription from "../assets/medical-prescription.png";

import Button from "../compenents/button/Button";
import NarbarNurse from "../compenents/navbar/NarBarNurse";
import { getPrescriptions } from "../services/prescription/getPrescriptions"; // Assuming you have this function

const Prescription: React.FC = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(""); // Add state for searchTerm
  const [prescriptions, setPrescriptions] = useState<any[]>([]); // State for storing prescriptions
  const [loading, setLoading] = useState<boolean>(true); // Loading state to show while fetching

  const formatPrefix = (prefix: string) => {
    if (prefix === "MISS") return "นางสาว";
    if (prefix === "MR") return "นาย";
    if (prefix === "MS") return "นาง";
    return prefix;
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(dateString));
  };

  // Fetch prescriptions on component mount
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const data = await getPrescriptions(); // Get data from your API
        console.log("Prescriptions:", data);
        setPrescriptions(data); // Store the data in state
      } catch (error) {
        console.error("Failed to fetch prescriptions:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchPrescriptions();
  }, []);

  const formatStatus = (status: string) => {
    if (status === "MedicationGiven") return "จ่ายยาเรียบร้อย";
    if (status === "MedicationNotGiven") return "ยังไม่จ่ายยา";
    return status;
  };

  const filteredPrescriptions = prescriptions.filter((prescription) =>
    String(prescription.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(prescription.appointment.patientId)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatPrefix(prescription.appointment.patient?.prefix).toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatDate(prescription.prescriptionDate).toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.appointment.patient?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prescription.appointment.patient?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatStatus(prescription.prescriptionStatus).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedPrescriptions = filteredPrescriptions.sort((a, b) => {
    // Check if either prescription has the 'MedicationNotGiven' status
    if (a.prescriptionStatus === "MedicationNotGiven" && b.prescriptionStatus !== "MedicationNotGiven") {
      return -1; // a should come before b
    }
    if (a.prescriptionStatus !== "MedicationNotGiven" && b.prescriptionStatus === "MedicationNotGiven") {
      return 1; // b should come before a
    }
    return 0; // No change in order if both have the same status
  });



  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div>
      <NarbarNurse textColor="#494949" />
      <hr style={{ borderTop: "1px solid #EBEBEB" }} />
      <h1 className="appointment-patient-title">ใบสั่งยา</h1>
      <div className="search-patient-input-container">
        <input
          type="text"
          placeholder="ค้นหาผู้ป่วย"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Set search term
        />
      </div>

      <section className="receipt-list-custom">
        {sortedPrescriptions.map((prescription) => (
          <div key={prescription.id} className="receipt-card-custom">
            <img src={medicinePrescription} alt="receipt icon" className="receipt-icon-custom" />
            <div className="receipt-details-custom">
              <div className="receipt-details-title">
                <h3 className="receipt-details-title">
                  รหัสใบสั่งยา: {prescription.id}
                </h3>
                <p className={`prescription-status ${prescription.prescriptionStatus === "MedicationGiven" ? "status-given" : "status-not-given"}`}>
                  {formatStatus(prescription.prescriptionStatus)}
                </p>
              </div>
              <p>วันที่ออกใบสั่งยา : {formatDate(prescription.prescriptionDate)}</p>
              <p className="patient-id-custom">รหัสผู้ป่วย : {prescription.appointment.patientId}</p>
              <p><span className="patient-full-name-custom">ผู้ป่วย: {formatPrefix(prescription.appointment.patient.prefix)}{prescription.appointment.patient.firstName} {prescription.appointment.patient.lastName}</span></p>
            </div>
            <div className="receipt-actions-custom">
              <Button text={prescription.prescriptionStatus === "MedicationNotGiven" ? "จัดยา" : "รายละเอียด"} onClick={() => navigate(`/prescription/${prescription.id}`)} />
            </div>
          </div>
        ))}
      </section>

    </div>
  );
};

export default Prescription;
