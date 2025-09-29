import React, { useState } from "react";
import "./profile.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Profile = () => {
  return (
    <>
      <Header></Header>
      <div className="form-container">
        {/* Lock phần này (được tự động điền cho user), ko cho user sửa */}
        <div className="details-container">
          <h2 className="details-title">Your Details</h2>
          <form action="">
            <div className="details-form-group">
              <label for="">Full Name</label>
              <input type="text" disabled="true" />
            </div>

            <div className="details-form-group">
              <label for="">Phone Number</label>
              <input type="text" disabled="true" />
            </div>

            <div className="details-form-group">
              <label for="">Email</label>
              <input type="text" disabled="true" />
            </div>
          </form>
        </div>

        <div className="details-container">
          <h2 className="details-title">Tuition Information</h2>

          <p className="guide-text">
            Please enter the <strong>STUDENT ID</strong> to get Tuition and
            Payment information
          </p>

          <form action="">
            <div className="details-form-group">
              <label for="">Student ID</label>
              <input type="text" />
            </div>

            <div className="error-studentId">Invalid student ID</div>

            <div className="details-form-group">
              <label for="">Student Full Name</label>
              <input type="text" disabled="true" />
            </div>
            <div className="details-form-group">
              <label for="">Amount of tuition</label>
              <input type="text" disabled="true" />
            </div>
          </form>
        </div>

        <div className="details-container">
          <h2 className="details-title">Payment Information</h2>
          <form action="">
            <div className="details-form-group">
              <label for="">Available Balance</label>
              <input type="text" disabled="true" />
            </div>

            <div className="details-form-group otp-inactive" id="otp-input">
              <label for="">OTP code</label>
              <input type="text" />
            </div>

            {/* Button chỉ active khi info ở Tuition và Payment đc điền đủ */}
            <button className="confirm-btn">Confirm</button>

            <div className="resend-otp">
              Didn’t receive the OTP?{" "}
              <a
                href="#"
                className="resend-btn"
                onClick={() => alert("Resend OTP")}
              >
                Resend
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Profile;
