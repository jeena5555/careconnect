import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Appointment from "./pages/Appointment"
import AppointmentDoctor from "./pages/AppointmentDoctor"
import SearchDoctor from "./pages/SearchDoctor"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Signin from "./pages/Signin"
import ConfirmationPage from "./pages/ConfirmSignin";
import Profile from "./pages/Profile";
import History from "./pages/History";

import PatientQ from "./pages/PatientQ";
import Treatment from "./pages/Treatment";
import AppointmentPatientByDoctor from "./pages/AppointmentPatientByDoctor";
import AppointmentByDoctor from "./pages/AppointmentByDoctor";

import PatientListByNurse from "./pages/PatientListByNurse";
import Prescription from "./pages/Prescription";
import PrescriptionDetail from "./pages/PrescriptionDetail";
import Invoice from "./pages/Invoice";
import InvoiceDetail from "./pages/InvoiceDetail";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-doctor" element={<SearchDoctor />} />
        <Route path="/appointment/:patientId?" element={<Appointment />} />
        <Route path="/appointment-doctor/:doctorId" element={<AppointmentDoctor />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signin />} />
        <Route path="/confirm" element={<ConfirmationPage />} />
        <Route path="/account/:id" element={<Profile />} />
        <Route path="/history" element={<History />} />

        <Route path="/patient-q" element={<PatientQ />} />
        <Route path="/treatment/:id" element={<Treatment />} />
        <Route path="/appointment-patient-by-doctor" element={<AppointmentPatientByDoctor />} />
        <Route path="/appointment-by-doctor/:id" element={<AppointmentByDoctor />} />

        <Route path="/patient-list" element={<PatientListByNurse />} />
        <Route path="/prescription" element={<Prescription />} />
        <Route path="/prescription/:id" element={<PrescriptionDetail />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/invoice/:id" element={<InvoiceDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
