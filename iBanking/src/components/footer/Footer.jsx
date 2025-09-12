import React from "react";
import "./footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={assets.mainLogo} alt="" />
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Elevate i-Banking. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
