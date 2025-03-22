import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/PrescriptionDetail.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import invoiceImg from "../assets/invoice.png";

import NavbarNurse from "../compenents/navbar/NarBarNurse";

import { getAppointmentById } from "../services/appointment/getAppointmentById";
import { getNurseById } from "../services/nurse/getNurseById";

import { createInvoice } from "../services/invoice/createInvoice";

const InvoiceDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const nurseId = Number(localStorage.getItem("nurseId"));

  const [appointment, setAppointment] = useState<any>(null); // Store prescriptions
  const [nurse, setNurse] = useState<any>(); // Store nurse data
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);


  useEffect(() => {
    const fetchAppointmentDetail = async () => {
      try {
        const data = await getAppointmentById(Number(id));
        setAppointment(data || []); // Handle null/undefined response

        console.log("Appointment data:", data)

        const nurseData = await getNurseById(nurseId);
        setNurse(nurseData);

      } catch (error) {
        console.error("Failed to fetch appointment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetail();
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
    if (status === "Treated") return "ชำระเงินเรียบร้อย";
    if (status === "NotTreated") return "ยังไม่ชำระเงิน";
    return status;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleConfirmInvoice = async () => {
    try {
      const response = await createInvoice(appointment.id);

      if (response) {
        setIsConfirmModalOpen(false);
        navigate(-1);
      }
    } catch (error) {
      console.error("Error confirming prescription:", error);
      // Handle any error (e.g., show an error message)
    }
  };

  const calculateTotal = () => {
    const treatmentTotal = appointment.treatment?.reduce(
      (sum: number, treatment: any) => sum + (treatment.treatmentType.cost || 0),
      0
    );

    const medicineTotal = appointment.prescription?.prescriptionMedicines?.reduce(
      (sum: number, prescriptionMedicine: any) => sum + (prescriptionMedicine.medicine.price || 0),
      0
    );

    return treatmentTotal + medicineTotal;
  };




  return (
    <div>
      <NavbarNurse textColor="#494949" />
      <hr style={{ borderTop: "1px solid #EBEBEB" }} />
      <main>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="prescription-detail-title" style={{ display: "flex" }}>
            <button className="back-btn-prescription" onClick={() => navigate(-1)} style={{ marginRight: 20 }}>
              <FontAwesomeIcon icon={faArrowLeft} /> รหัสใบเสร็จค่ารักษาพยาบาล {appointment.id}
            </button>
            <p className={`prescription-status ${appointment.appointmentStatus === "Treated" ? "status-given" : "status-not-given"}`}>
              {formatStatus(appointment.appointmentStatus)}
            </p>
          </div>
        </div>

        <section className="prescription">
          <div className="prescription-header">
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
              <div style={{ display: "flex" }}>
                <img src={invoiceImg} alt="prescription icon" className="prescription-detail-icon" />
                <div className="prescription-details">
                  <h3>รหัสใบเสร็จค่ารักษาพยาบาล {appointment.id}</h3>
                  <p className="patient-id-custom">รหัสผู้ป่วย : {appointment.patientId}</p>
                  <p><span className="patient-full-name-custom">ผู้ป่วย:{formatPrefix(appointment.patient.prefix)}{appointment.patient.firstName} {appointment.patient.lastName}</span></p>
                </div>
              </div>
              {appointment.appointmentStatus !== "Treated" && <button className="blue-btn-customer" onClick={() => setIsConfirmModalOpen(true)}>ยืนยันการชำระเงิน</button>}
            </div>
          </div>

          <div className="invoice-content">
            <div className="invoice-header">
              <h2 className="invoice-title">ใบเสร็จค่ารักษาพยาบาล</h2>
              <p>โรงพยาบาล Care Connect</p>
            </div>
            <hr style={{ borderTop: "1px solid #ccc", width: "100%" }} />
            <p>{formatPrefix(appointment.patient.prefix)}{appointment.patient.firstName} {appointment.patient.lastName}</p>

            {appointment.invoice && <p>วันที่ออกใบเสร็จ: {formatDate(appointment.invoice.createdAt)}</p>}

            <table className="invoice-table">
              <thead>
                <tr>
                  <th>รายการ</th>
                  <th>จำนวนเงิน</th>
                </tr>
              </thead>
              <tbody>
                {appointment.treatment?.length > 0 || appointment.prescription?.prescriptionMedicines?.length > 0 ? (
                  <>
                    {appointment.treatment?.map((treatment: any, index: number) => (
                      <tr key={`treatment-${index}`}>
                        <td>{treatment.treatmentType.name}</td>
                        <td>{treatment.treatmentType.cost || "N/A"}</td>
                      </tr>
                    ))}
                    {appointment.prescription?.prescriptionMedicines?.map((prescriptionMedicine: any, index: number) => (
                      <tr key={`medicine-${index}`}>
                        <td>{prescriptionMedicine.medicine.name}</td>
                        <td>{prescriptionMedicine.medicine.price || "N/A"}</td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td colSpan={2} style={{ textAlign: "center", padding: "10px", color: "gray", fontSize: "larger" }}>
                      ยังไม่เริ่มการรักษา
                    </td>
                  </tr>
                )}
              </tbody>


              <tfoot>
                <tr>
                  <td className="total">จำนวนเงินรวม</td>
                  <td className="total">{calculateTotal().toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

          <div className="signature">ลงชื่อ ............................... ผู้รับเงิน</div>
        </div>
        </section>

        {/* Modal ใบสั่งยา */}
      {isConfirmModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>ยืนยันการชำระเงิน</h2>

            <img src={invoiceImg} alt="heartcare" className="heart-img"></img>

            <div className="modal-actions-confirm">
              <button
                className="modal-cancel-confirm"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="modal-submit-confirm"
                onClick={handleConfirmInvoice}
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


export default InvoiceDetail;
