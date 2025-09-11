import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div class="login-wrapper">
      <div class="login-container">
        <h2 class="login-title">Log in</h2>

        <form>
          <div class="login-form-group">
            <label for="">Username</label>
            <input type="text" name="" id="" />
          </div>

          <div class="login-form-group">
            <label for="">Password</label>
            <input type="password" name="" id="" />
          </div>

          <div class="login-form-footer">
            <button class="login-btn">Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
