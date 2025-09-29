import React from "react";
import "./header.css";
import { assets } from "../../assets/assets";
import { useBanking } from "../../context/BankingContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout } = useBanking();
  const navigate = useNavigate();

  function handleLogout() {
    try {
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout fail: " + error);
    }
  }

  return (
    <header>
      <div className="header-container">
        <div className="nav-left">
          <a className="logo">
            <img src={assets.mainLogo} alt="Logo" />
          </a>
        </div>

        <div className="nav-right">
          <a onClick={handleLogout}>Log out</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
