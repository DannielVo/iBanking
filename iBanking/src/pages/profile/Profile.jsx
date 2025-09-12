import React from "react";
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
          <h2 className="details-title">Your details</h2>
          <form action="">
            <div className="details-form-group">
              <label for="">Full Name</label>
              <input type="text" />
            </div>

            <div className="details-form-group">
              <label for="">Phone Number</label>
              <input type="text" />
            </div>

            <div className="details-form-group">
              <label for="">Email</label>
              <input type="text" />
            </div>
          </form>
        </div>

        <div className="details-container">
          <h2 className="details-title">Tuition Information</h2>
          <form action="">
            <div className="details-form-group">
              <label for="">Student ID</label>
              <input type="text" />
            </div>

            <div className="details-form-group">
              <label for="">Student Full Name</label>
              <input type="text" />
            </div>

            <div className="details-form-group">
              <label for="">Amount of tuition</label>
              <input type="text" />
            </div>
          </form>
        </div>

        <div className="details-container">
          <h2 className="details-title">Payment Information</h2>
          <form action="">
            <div className="details-form-group">
              <label for="">Available Balance</label>
              <input type="text" />
            </div>

            <div className="details-form-group">
              <label for="">Amount of tuition</label>
              <input type="text" />
            </div>

            {/* <!-- ??? Policy --> */}

            {/* Button chỉ active khi info ở Tuition và Payment đc điền đủ */}
            <button className="confirm-btn">Confirm</button>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Profile;
