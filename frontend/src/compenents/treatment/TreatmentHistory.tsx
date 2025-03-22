import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTreatmentType } from "../../services/treatment/getTreatmentType";
import { getMedicines } from "../../services/medicine/getMedicines";

import "./TreatmentHistory.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import heartCare from "../../assets/heart-care.png"

import { createTreatment } from "../../services/treatment/createTreatment";
import { createPrescription } from "../../services/prescription/createPrescription";

interface TreatmentHistoryProps {
  appointmentId: number;
}

const TreatmentHistory: React.FC<TreatmentHistoryProps> = ({ appointmentId }) => {
  const navigate = useNavigate();

  const [isTreatmentModalOpen, setIsTreatmentModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [treatmentTypes, setTreatmentTypes] = useState([]);
  const [medicines, setMedicines] = useState([]);

  const [treatments, setTreatments] = useState([]); // State to store added treatments

  const [prescriptionDetail, setPrescriptionDetail] = useState(""); // State for prescription detail
  const [prescriptions, setPrescriptions] = useState([]); // State to store added medicines

  const [newTreatment, setNewTreatment] = useState({
    typeId: "",
    type: "",
    detail: "",
    diagnose: "",
  });

  const [newPrescription, setNewPrescription] = useState({
    medicineId: "",
    medicine: "",
    quantity: "",
    duration: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const treatmentResponse = await getTreatmentType();
      console.log(treatmentResponse);
      setTreatmentTypes(treatmentResponse);

      const medicineResponse = await getMedicines();
      console.log(medicineResponse);
      setMedicines(medicineResponse);
    };
    fetchData();
  }, []);

  const handleTreatmentChange = (e) => {
    const { name, value } = e.target;
    setNewTreatment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTreatment = () => {
    const treatmentTypeId = treatmentTypes.find(
      (type) => type.name === newTreatment.type
    )?.id;

    const updatedTreatments = [...treatments, { ...newTreatment, id: Date.now(), typeId: treatmentTypeId }];
    setTreatments(updatedTreatments);

    console.log("Updated Treatments: ", updatedTreatments);

    setNewTreatment({ typeId: '', type: '', detail: '', diagnose: '' });
    setIsTreatmentModalOpen(false);
  };

  const handleRemoveTreatment = (id) => {
    setTreatments((prev) => prev.filter((treatment) => treatment.id !== id));
  };

  const handlePrescriptionDetailChange = (e) => {
    setPrescriptionDetail(e.target.value);
  };

  const handlePrescriptionChange = (e) => {
    const { name, value } = e.target;
    setNewPrescription((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPrescription = () => {
    const medicineId = medicines.find(
      (medicine) => medicine.name === newPrescription.medicine
    )?.id;

    const updatedMedicine = [...prescriptions, { ...newPrescription, id: Date.now(), medicineId: medicineId }];
    setPrescriptions(updatedMedicine);

    console.log("Updated Medicine: ", updatedMedicine);

    setNewPrescription({ medicineId: '', medicine: '', quantity: '', duration: '' });
    setIsPrescriptionModalOpen(false);
  };

  const handleRemovePrescription = (id) => {
    setPrescriptions((prev) => prev.filter((prescription) => prescription.id !== id));
  };

  const handleCreateTreatmentAndPrescription = async () => {
    try {
      for (const treatment of treatments) {
        await new Promise((resolve) => setTimeout(resolve, 500));

        console.log("Sending treatment:", treatment);

        await createTreatment({
          appointmentId,
          treatmentTypeId: treatment.typeId,
          details: treatment.detail,
          diagnose: treatment.diagnose,
        });

        console.log("Treatment created successfully");
      }

      if (prescriptions.length > 0) {
        await createPrescription({
          appointmentId,
          prescriptionDetail,
          medicines: prescriptions,
        });

        console.log("Prescription created successfully");
      }

      setIsConfirmModalOpen(false);
      navigate("/patient-q");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
};



  return (
    <div>
      <div className="treatment-container">
        {/* การรักษา */}
        <div className="treatment-section-wrapper">
          <div className="treatment-section-wrapper-title">
            <h2>การรักษา</h2>
            <button
              className="treatment-add-button"
              onClick={() => setIsTreatmentModalOpen(true)}
            >
              + เพิ่มการรักษา
            </button>
          </div>
          <div
            className={`treatment-additional ${treatments.length > 0 ? "open" : ""}`}
          >
            {treatments.map((treatment) => (
              <div key={treatment.id} className="treatment-item">
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: "#15CDCB", cursor: "pointer" }}
                  onClick={() => handleRemoveTreatment(treatment.id)}
                />
                <span className="treatment-tag">{treatment.type}</span> {treatment.detail}
              </div>
            ))}
          </div>
        </div>

        {/* Modal การรักษา */}
        {isTreatmentModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>เพิ่มการรักษา</h2>

              <div className="treatment-type-container">
                <label>ประเภทการรักษา :</label>
                <select
                  className="treatment-type-select"
                  name="type"
                  value={newTreatment.type}
                  onChange={handleTreatmentChange}
                >
                  <option value="">เลือกประเภทการรักษา</option>
                  {treatmentTypes.map((type) => (
                    <option key={type.id} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="detail-container">
                <label>รายละเอียด :</label>
                <input
                  type="text"
                  className="detail-input"
                  name="detail"
                  value={newTreatment.detail}
                  onChange={handleTreatmentChange}
                />
              </div>

              <div className="diagnose-container">
                <label>ผลการวินิจฉัย :</label>
                <input
                  type="text"
                  className="diagnose-input"
                  name="diagnose"
                  value={newTreatment.diagnose}
                  onChange={handleTreatmentChange}
                />
              </div>

              <div className="modal-actions-treatment">
                <button
                  className="modal-cancel-treatment"
                  onClick={() => setIsTreatmentModalOpen(false)}
                >
                  ยกเลิก
                </button>
                <button
                  className="modal-submit-treatment"
                  onClick={handleAddTreatment}
                >
                  เพิ่มการรักษา
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ใบสั่งยา */}
        <div className="prescription-section-wrapper">
          <div className="treatment-section-wrapper-title">
            <h2>ใบสั่งยา</h2>
            <button
              className="prescription-add-button"
              onClick={() => setIsPrescriptionModalOpen(true)}
            >
              + เพิ่มยา
            </button>
          </div>
          <div className="prescription-detail">
            <p><strong>รายละเอียด :</strong></p>
            <textarea
              className="prescription-detail-textarea"
              placeholder="กรอกรายละเอียด"
              value={prescriptionDetail} // Bind to the state
              onChange={handlePrescriptionDetailChange} // Handle change
            ></textarea>

          </div>
          <div className="prescription-list">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="prescription-item">
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ color: "#15CDCB", cursor: "pointer" }}
                  onClick={() => handleRemovePrescription(prescription.id)}
                />
                <span className="medicine-name">{prescription.medicine}</span>
                <span className="prescription-quantity">{prescription.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal ใบสั่งยา */}
        {isPrescriptionModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>เพิ่มยา</h2>

              <div className="treatment-type-container">
                <label>ชื่อยา :</label>
                <select
                  className="treatment-type-select"
                  name="medicine"
                  value={newPrescription.medicine}
                  onChange={handlePrescriptionChange}
                >
                  <option value="">เลือกยา</option>
                  {medicines.map((med) => (
                    <option key={med.id} value={med.name}>
                      {med.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="detail-container">
                <label>จำนวน :</label>
                <input
                  type="text"
                  className="detail-input"
                  name="quantity"
                  value={newPrescription.quantity}
                  onChange={handlePrescriptionChange}
                />
              </div>

              <div className="diagnose-container">
                <label>ระยะเวลา :</label>
                <input
                  type="text"
                  className="diagnose-input"
                  name="duration"
                  value={newPrescription.duration}
                  onChange={handlePrescriptionChange}
                />
              </div>

              <div className="modal-actions-prescription">
                <button
                  className="modal-cancel-prescription"
                  onClick={() => setIsPrescriptionModalOpen(false)}
                >
                  ยกเลิก
                </button>
                <button
                  className="modal-submit-prescription"
                  onClick={handleAddPrescription}
                >
                  เพิ่มยา
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="save-btn-div">
        <button className="save-treatment" onClick={() => setIsConfirmModalOpen(true)}>บันทึกข้อมูลการรักษา</button>
      </div>

      {/* Modal ใบสั่งยา */}
      {isConfirmModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>ยืนยันการบันทักข้อมูลการรักษา</h2>

            <img src={heartCare} alt="heartcare" className="heart-img"></img>

            <div className="modal-actions-confirm">
              <button
                className="modal-cancel-confirm"
                onClick={() => setIsConfirmModalOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="modal-submit-confirm"
                onClick={handleCreateTreatmentAndPrescription}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TreatmentHistory;
