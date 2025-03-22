import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Profile.css";

import Navbar from "../compenents/navbar/Navbar";
import PatientInfoForm from "../compenents/patient/PatientInfo";

const EditPersonalInfo = () => {
  const navigate = useNavigate();

  const accountId = Number(localStorage.getItem("accountId"));

  return (
    <div>
      <Navbar textColor="#494949" />
      <hr style={{ borderTop: "1px solid #EBEBEB" }} />
      <h1 className="edit-profile-title">แก้ไขข้อมูลส่วนตัว</h1>
      <PatientInfoForm accountId={accountId}  isEditable={true}/>
    </div>
  );
};

export default EditPersonalInfo;
