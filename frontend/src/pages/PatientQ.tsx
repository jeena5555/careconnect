import React, { useEffect, useState } from "react";
import "./css/PatientQ.css"

import NarbarDoctor from "../compenents/navbar/NarBarDoctor";
import AppointmentList from "../compenents/patient/AppointmentPatient";

const PatientQ: React.FC = () => {
  return (
    <div>
      <NarbarDoctor textColor="#494949" />
      <hr style={{ borderTop: "1px solid #EBEBEB" }} />
      <h1 className="appointment-patient-title" >คิวผู้ป่วย</h1>
      <AppointmentList />
    </div>
  );
};

export default PatientQ;

