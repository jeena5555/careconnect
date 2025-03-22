import React from 'react';
import Navbar from '../compenents/navbar/Navbar';
import hospitalLocation from '../assets/hospital-location.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faLine } from "@fortawesome/free-brands-svg-icons";


const Contact: React.FC = () => {
  return (
    <div>
      <Navbar textColor="#494949" />
      <hr style={{ borderTop: "1px solid #EBEBEB" }} />
      <div className="contact">
        <h1 className="contact-title">ติดต่อเรา</h1>

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

export default Contact
