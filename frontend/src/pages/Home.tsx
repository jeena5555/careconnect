import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/Home.css"; // Import CSS

import Narbar from '../compenents/navbar/Navbar';


import handleBookAppointment from "./Appointment"

import Button from "../compenents/button/Button"

import heartIcon from "../assets/heart-care.png";
import boneIcon from "../assets/bone-cancer.png";

import nurseBag from "../assets/nurse-bag.png";
import doctor from "../assets/doctor.png";
import nurseTalkingPatient from "../assets/nurse-talking-patient.png";

// service data
import xRay from "../assets/x-rays.png";
import baby from "../assets/baby.png";
import ear from "../assets/ear.png";
import epidermis from "../assets/epidermis.png";
import medicalKit from "../assets/medical-kit.png";
import uterus from "../assets/uterus.png";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faLine } from "@fortawesome/free-brands-svg-icons";
import hospitalLocation from "../assets/hospital-location.png";

type ServiceData = {
  image: string;
  department_name: string;
  detail: string;
  id_service: number;
}

const serviceData: ServiceData[] = [
  {
    image: xRay,
    department_name: "กระดูก (ออร์โธปิดิกส์)",
    detail: "รักษาโรคเกี่ยวกับกระดูก ข้อต่อ และกล้ามเนื้อ เช่น การรักษาอาการกระดูกหัก, ผ่าตัดเปลี่ยนข้อเข่า, การรักษาอาการปวดหลังและบำบัดการเคลื่อนไหว",
    id_service: 1,
  },
  {
    image: baby,
    department_name: "เด็ก (กุมารเวช)",
    detail: "ดูแลและรักษาโรคในเด็กตั้งแต่แรกเกิดจนถึงวัยรุ่น รวมถึงการฉีดวัคซีน พัฒนาการของเด็ก และการรักษาโรคเฉพาะทางในเด็ก",
    id_service: 2,
  },
  {
    image: ear,
    department_name: "ตา หู คอ จมูก",
    detail: "ตรวจวินิจฉัยและรักษาโรคเกี่ยวกับตา หู, คอ และจมูก เช่น โรคไซนัส, การติดเชื้อในหู, โรคเส้นเสียง, อาการหูอื้อ และโรคต้อกระจก",
    id_service: 3,
  },
  {
    image: epidermis,
    department_name: "ผิวหนัง",
    detail: "ตรวจและรักษาโรคเกี่ยวกับผิวหนัง, ผม, เล็บ และเยื่อบุ เช่น โรคผื่นคัน, สิว, สะเก็ดเงิน และการตรวจมะเร็งผิวหนัง",
    id_service: 4,
  },
  {
    image: medicalKit,
    department_name: "โรคทั่วไป (อายุรกรรม)",
    detail: "ทำการตรวจและรักษาโรคทั่วไปที่ไม่ต้องผ่าตัด เช่น โรคเบาหวาน, โรคความดันโลหิตสูง, โรคหัวใจ, โรคทางเดินหายใจ และโรคติดเชื้อ",
    id_service: 5,
  },
  {
    image: uterus,
    department_name: "ผู้หญิง (สูตินรีเวช)",
    detail: "ให้บริการดูแลสุขภาพสำหรับสตรีตั้งแต่การ ตั้งครรภ์, รวมถึงการตรวจโรคทางนรีเวช และการรักษาโรคทางสตรี",
    id_service: 6,
  },
];

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <Narbar/>
      <section className="hero-section">
        <div className="overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="highlight">CARECONNECT</span> HOSPITAL
          </h1>
          <p className="hero-subtitle">เพราะเรา "แคร์" คุณ</p>
          <p className="hero-description">
            ที่ CareConnect Hospital เรามุ่งมั่นในการสร้างประสบการณ์การดูแลรักษาที่ดีที่สุดโดยให้ความสำคัญทั้งในด้านคุณภาพการรักษาและการบริการที่เป็นมิตร ด้วยการนำเสนอเทคโนโลยีการรักษาที่ทันสมัยและทีมแพทย์ผู้เชี่ยวชาญที่มีความรู้ความสามารถ พร้อมทั้งบุคลากรทางการแพทย์ที่มีความเอาใจใส่ เพื่อให้ทุกการรักษาเกิดประสิทธิภาพสูงสุดและตรงกับความต้องการของผู้ป่วย
          </p>

          <div className="hero-buttons">
            <button className="btn-outline" onClick={() => navigate('/search-doctor')}>ค้นหาแพทย์</button>
            <Button
              text="จองคิวพบแพทย์"
              onClick={() => navigate('/appointment')}
            />
          </div>
        </div>
        <img src={heartIcon} alt="Heart" className="floating-icon heart-icon" />
        <img src={boneIcon} alt="Heart" className="floating-icon bone-icon" />
      </section>
      <div className="welcome">
        <div className="left-detail">
          <div className="title">
            <h1>ยินดีต้อนรับสู่</h1>
            <p>โรงพยาบาล <span>CareConnect</span></p>
          </div>

          <div className="sub-title">
            <p>
              ไม่ว่าคุณจะต้องการคำปรึกษาทางการแพทย์ การตรวจวินิจฉัย การรักษา หรือการฟื้นฟูสุขภาพ เราพร้อมให้บริการด้วยความใส่ใจและมาตรฐานการแพทย์ที่ดีที่สุด เพื่อให้คุณมั่นใจได้ว่า CareConnect Hospital คือโรงพยาบาลที่คุณสามารถไว้วางใจได้
            </p>
          </div>

          <div className="detail">
            <p>
              เพราะเราเข้าใจและใส่ใจในสุขภาพของคุณ CareConnect Hospital ยินดีที่จะอยู่เคียงข้างและเป็นส่วนหนึ่ง
              ในการดูแลสุขภาพของคุณและคนที่คุณรักเสมอ
            </p>
          </div>

          <img src={nurseBag} alt="NurseBag" className="icon nurse-icon" />
        </div>

        <div className="right-detail">
          <img src={doctor} alt="Doctor" className="icon doctor-icon" />
          <img src={nurseTalkingPatient} alt="NurseTalkingPatient" className="icon nurse-patient-icon" />
        </div>
      </div>

      <div className="service">
        <div className="service-title">
          <h1 className="title-service">บริการของเรา</h1>
          <Button
            text="จองคิวพบแพทย์"
            onClick={() => navigate('/appointment')}
          />
        </div>

        <div className="service-list">
          {serviceData.map((service) => (
            <div
              key={service.id_service}
              className="service-card"
            >
              <div className="service-overlay">
                <img
                  src={service.image}
                  alt={service.department_name}
                  className="service-img"
                />
              </div>
              <div className="service-group">
                <h2 className="service-department">{service.department_name}</h2>
                <p className="service-detail">{service.detail}</p>
                <button className="btn-doctor" onClick={() => navigate('/search-doctor')}>แพทย์ประจำแผนก</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr style={{borderTop: '1px #EBEBEB', marginTop: '80px'}} />

      <div className="contact">
        <h1 className="contact-title">ที่อยู่ และช่องทางติดต่อ</h1>

        <div className="contact-detail">
          <div className="contact-left">
            <FontAwesomeIcon icon={faLocationDot} style={{color: '#15CDCB', margin: "0 10px", padding: "16px 0"}}/>
            <p className="address">
              โรงพยาบาล CareConnect  ซ.ศูนย์วิจัย 7 ถ.เพชรบุรีตัดใหม่ แขวงบางกะปิ เขตห้วยขวาง กรุงเทพฯ 10310 ประเทศไทย
            </p>
          </div>

          <div className="contact-right">
            <p><FontAwesomeIcon icon={faPhone} style={{color: '#15CDCB', margin: "0 10px"}} />02 310 3000 หรือ 1719</p>
            <p><FontAwesomeIcon icon={faEnvelope} style={{color: '#15CDCB', margin: "0 10px"}} />info@careconnecthospital.com</p>
            <p><FontAwesomeIcon icon={faFacebook} style={{color: '#15CDCB', margin: "0 10px"}} />careconnecthospital</p>
            <p><FontAwesomeIcon icon={faLine} style={{color: '#15CDCB', margin: "0 10px"}} />@careconnecthospital</p>
          </div>

          <img src={hospitalLocation} alt="hospitalLocation" className="icon hospital-location-icon" />
        </div>
      </div>
    </div>
  );
};

export default Home;
