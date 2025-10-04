import React, { useState } from "react";
import "./profile.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useBanking } from "../../context/BankingContext";

const Profile = () => {
  const {
    customer,
    account,
    loading,
    fetchCustomerInfo,
    fetchCustomerPayment,
    fetchUnpaidPayment,
    sendOtpEmail,
  } = useBanking();

  const [customerPayment, setCustomerPayment] = useState(null);
  const [payment, setPayment] = useState(null);
  const [isSentOtp, setIsSentOtp] = useState(false);

  const findCustomerPayment = async (e) => {
    if (e.key == "Enter") {
      try {
        const customerPaymentId = e.target.value;
        const customerData = await fetchCustomerPayment(customerPaymentId);
        setCustomerPayment(customerData);

        const paymentData = await fetchUnpaidPayment(customerPaymentId);
        setPayment(paymentData);
      } catch (error) {
        alert(error.detail);
      }
    }
  };

  const handleOtpEvent = (e) => {
    e.preventDefault();
    if (isSentOtp) {
      // Đã gửi rồi
      // Thực hiện logic confirm:
      /* 
        - Lấy input OTP mà customer nhập
        - Gọi hàm API validate OTP
        - Nếu OTP hợp lệ thì gọi API make_payment của payment service
        - Nếu ko hợp lệ thì hiện lỗi
      */
      setIsSentOtp(false);
    } else {
      // Chưa gửi
      // Thực hiện send otp
      /* 
        - Lấy customerId của thg login
        - Gọi API tới email service để gọi hàm send_confirmation
        - Chuyển nút thành confirm
      */
      sendOtpEmail();
      setIsSentOtp(true);
    }
  };

  const handleSendOtp = () => {
    sendOtpEmail();
  };

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
              <input
                type="text"
                disabled="true"
                value={customer?.full_name || ""}
              />
            </div>

            <div className="details-form-group">
              <label for="">Phone Number</label>
              <input
                type="text"
                disabled="true"
                value={customer?.phone_number || ""}
              />
            </div>

            <div className="details-form-group">
              <label for="">Email</label>
              <input
                type="text"
                disabled="true"
                value={customer?.email || ""}
              />
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
              <input type="text" onKeyDown={(e) => findCustomerPayment(e)} />
            </div>

            <div className="error-studentId">Invalid student ID</div>

            <div className="details-form-group">
              <label for="">Student Full Name</label>
              <input
                type="text"
                disabled="true"
                value={customerPayment?.full_name || ""}
              />
            </div>
            <div className="details-form-group">
              <label for="">Amount of tuition</label>
              <input
                type="text"
                disabled="true"
                value={payment?.amount || ""}
              />
            </div>
          </form>
        </div>

        <div className="details-container">
          <h2 className="details-title">Payment Information</h2>
          <form onSubmit={(e) => handleOtpEvent(e)}>
            <div className="details-form-group">
              <label for="">Available Balance</label>
              <input
                type="text"
                disabled="true"
                value={account?.balance || ""}
              />
            </div>

            <div className="details-form-group otp-inactive" id="otp-input">
              <label for="">OTP code</label>
              <input type="text" />
            </div>

            {/* Button chỉ active khi info ở Tuition và Payment đc điền đủ */}
            <button className="confirm-btn" type="submit">
              {isSentOtp ? "Confirm" : "Send OTP"}
            </button>

            {isSentOtp && (
              <div className="resend-otp">
                Didn’t receive the OTP?{" "}
                <a
                  href="#"
                  className="resend-btn"
                  onClick={() => handleSendOtp()}
                >
                  Resend
                </a>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Profile;
