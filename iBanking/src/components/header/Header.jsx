import React from "react";
import "./header.css";
import { assets } from "../../assets/assets";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="nav-left">
          <a href="profile.html" className="logo">
            <img src={assets.mainLogo} alt="Logo" />
          </a>
        </div>

        <div className="nav-right">
          <a href="#">Log out</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
