import React, { useEffect, useState } from "react";
import "./css/PatientQ.css"

import NarbarDoctor from "../compenents/navbar/NarBarDoctor";
import PatientList from "../compenents/patient/PatientList";

const PatientQ: React.FC = () => {
  return (
    <div>
      <NarbarDoctor textColor="#494949" />
      <hr style={{ borderTop: "1px solid #EBEBEB" }} />
      <h1 className="appointment-patient-title" >นัดหมายผู้ป่วย</h1>
      <PatientList />
    </div>
  );
};

export default PatientQ;

