import React from "react";
import "./login.css";
import { assets } from "../../assets/assets";

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
          <img src={assets.mainLogo} alt="" />
          {/* <h2 className="login-title">Log in</h2> */}
        </div>

        <form>
          <div className="login-form-group">
            <label htmlFor="">Username</label>
            <input type="text" name="" id="" />
          </div>

          <div className="login-form-group">
            <label htmlFor="">Password</label>
            <input type="password" name="" id="" />
          </div>

          <div className="login-form-footer">
            <button className="login-btn">Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
