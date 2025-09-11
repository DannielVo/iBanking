import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Log in</h2>

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
