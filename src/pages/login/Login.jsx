import React, { useState } from "react";
import "./login.css";
import { assets } from "../../assets/assets";
import { useBanking } from "../../context/BankingContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { login, error, loading } = useBanking();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [internalError, setInternalError] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    try {
      if (email == "" || password == "") {
        setShowError(true);
        return;
      }
      await login(email, password);
      navigate("/profile");
    } catch (error) {
      console.error("login fail: " + error);
      setInternalError(true);
    }
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <img src={assets.mainLogo} alt="" />
        </div>

        <form onSubmit={handleLogin}>
          <div className="login-form-group">
            <label htmlFor="">Username</label>
            <input
              type="email"
              name=""
              id=""
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-form-group">
            <label htmlFor="">Password</label>

            <input
              type="password"
              name=""
              id=""
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {showError && (
            <div className="error-text">Invalid email or password</div>
          )}

          {internalError && (
            <div className="error-text">
              Oops! Something went wrong. Please try again later!
            </div>
          )}

          <div className="login-form-footer">
            <button className="login-btn" type="submit">
              {loading ? "Login...." : "Log in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
