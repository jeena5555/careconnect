import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/PatientQ.css"

import NarbarNurse from "../compenents/navbar/NarBarNurse";
import PatientList from "../compenents/patient/PatientList";

import Button from "../compenents/button/Button";

const PatientListByNurse: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <NarbarNurse textColor="#494949" />
      <hr style={{ borderTop: "1px solid #EBEBEB" }} />
      <div className="patient-by-nurse-title">
        <h1 className="appointment-patient-title" >รายชื่อผู้ป่วย</h1>
        <Button
          text="+ ลงทะเบียนผู้ป่วย"
          onClick={() => navigate('/signup')}
        />
      </div>

      <PatientList />
    </div>
  );
};

export default PatientListByNurse;

