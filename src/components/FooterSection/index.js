import {FaGoogle, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'

import './index.css'

const FooterSection = () => (
  <div className="contact-icons-container">
    <div className="icon-container">
      <div className="icon">
        <FaGoogle className="contact-icon" />
      </div>
      <div className="icon">
        <FaInstagram className="contact-icon" />
      </div>
      <div className="icon">
        <FaTwitter className="contact-icon" />
      </div>
      <div className="icon">
        <FaYoutube className="contact-icon" />
      </div>
    </div>

    <p className="contact-heading">Contact us</p>
  </div>
)

export default FooterSection
