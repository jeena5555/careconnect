import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Prescription.css";

import invoiceImg from "../assets/invoice.png";

import Button from "../compenents/button/Button";
import NarbarNurse from "../compenents/navbar/NarBarNurse";
import { getAppointments } from "../services/appointment/getAppointments";

const Invoice: React.FC = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState(""); // Add state for searchTerm
  const [appointments, setAppointments] = useState<any[]>([]); // State for storing prescriptions
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
        const data = await getAppointments(); // Get data from your API
        console.log("Appointmenr:", data);
        setAppointments(data); // Store the data in state
      } catch (error) {
        console.error("Failed to fetch prescriptions:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchPrescriptions();
  }, []);

  const formatStatus = (status: string) => {
    if (status === "Treated") return "ชำระเงินเรียบร้อย";
    if (status === "NotTreated") return "ยังไม่ชำระเงิน";
    return status;
  };

  const filteredAppointments = appointments.filter((appointment) =>
    String(appointment.id).toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(appointment.patientId)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatPrefix(appointment.patient?.prefix).toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatDate(appointment.appointmentDate).toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.patient?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.patient?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    formatStatus(appointment.appointmentStatus).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAppointments = filteredAppointments.sort((a, b) => {
    // Check if either prescription has the 'MedicationNotGiven' status
    if (a.appointmentStatus === "NotTreated" && b.appointmentStatus !== "NotTreated") {
      return -1; // a should come before b
    }
    if (a.appointmentStatus !== "NotTreated" && b.appointmentStatus === "NotTreated") {
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
      <h1 className="appointment-patient-title">ใบเสร็จค่ารักษาพยาบาล</h1>
      <div className="search-patient-input-container">
        <input
          type="text"
          placeholder="ค้นหาผู้ป่วย"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Set search term
        />
      </div>

      <section className="receipt-list-custom">
        {sortedAppointments.map((appointment) => (
          <div key={appointment.id} className="receipt-card-custom">
            <img src={invoiceImg} alt="receipt icon" className="receipt-icon-custom" />
            <div className="receipt-details-custom">
              <div className="receipt-details-title">
                <h3 className="receipt-details-title">
                  รหัสใบสั่งยา: {appointment.id}
                </h3>
                <p className={`prescription-status ${appointment.appointmentStatus === "Treated" ? "status-given" : "status-not-given"}`}>
                  {formatStatus(appointment.appointmentStatus)}
                </p>
              </div>
              <p>วันที่ออกใบสั่งยา : {formatDate(appointment.appointmentDate)}</p>
              <p className="patient-id-custom">รหัสผู้ป่วย : {appointment.patientId}</p>
              <p><span className="patient-full-name-custom">ผู้ป่วย: {formatPrefix(appointment.patient.prefix)}{appointment.patient.firstName} {appointment.patient.lastName}</span></p>
            </div>
            <div className="receipt-actions-custom">
              <Button text={appointment.appointmentStatus === "NotTreated" ? "ชำระเงิน" : "รายละเอียด"} onClick={() => navigate(`/invoice/${appointment.id}`)} />
            </div>
          </div>
        ))}
      </section>

    </div>
  );
};

export default Invoice;
