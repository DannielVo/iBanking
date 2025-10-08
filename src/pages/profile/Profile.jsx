import React, { useEffect, useRef, useState } from "react";
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
    verifyOtpEmail,
    makePayment,
  } = useBanking();

  const [customerPayment, setCustomerPayment] = useState(null);
  const [payment, setPayment] = useState(null);
  const [isSentOtp, setIsSentOtp] = useState(false);
  const [otpMsg, setOtpMsg] = useState("");
  const [otpValue, setOtpValue] = useState("");
  const [customerPaymentId, setCustomerPaymentId] = useState("");
  const [errorStudentPayment, setErrorStudentPayment] = useState("");
  const [isErrorPayment, setIsErrorPayment] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0); // ban đầu = 0, chưa chạy
  const timerRef = useRef(null);

  const resetTuitionInfo = () => {
    setErrorStudentPayment("");
    setCustomerPaymentId("");
    setCustomerPayment(null);
    setPayment(null);
    setIsSentOtp(false);
  };

  const findCustomerPayment = async (e) => {
    if (e.key == "Enter") {
      try {
        if (e.target.value === "") {
          resetTuitionInfo();
          return;
        }
        const customerPaymentIdValue = e.target.value;
        setCustomerPaymentId(customerPaymentIdValue);
        const customerData = await fetchCustomerPayment(customerPaymentIdValue);
        setCustomerPayment(customerData);

        const paymentData = await fetchUnpaidPayment(customerPaymentIdValue);
        setPayment(paymentData);
        setErrorStudentPayment("");
      } catch (error) {
        setErrorStudentPayment(error.detail);
      }
    }
  };

  const handleSendOtp = () => {
    sendOtpEmail();
    clearInterval(timerRef.current);
    setTimeLeft(120);
  };

  const handleOtpEvent = async (e) => {
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
      try {
        await verifyOtpEmail(otpValue);
        await makePayment(customerPaymentId);

        setIsErrorPayment(false);
        setOtpMsg("");
        resetTuitionInfo();
      } catch (error) {
        setOtpMsg(error.detail || "Something went wrong! Please try again!");
        setIsErrorPayment(true);
      }
    } else {
      // Chưa gửi
      // Thực hiện send otp
      /* 
        - Lấy customerId của thg login
        - Gọi API tới email service để gọi hàm send_confirmation
        - Chuyển nút thành confirm
      */
      handleSendOtp();
      setIsSentOtp(true);
    }
  };

  const isBtnSendOtpAvailable =
    customerPaymentId !== "" &&
    customerPayment !== null &&
    errorStudentPayment === "" &&
    payment !== null &&
    account !== null &&
    payment.amount <= account.balance;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [timeLeft]); // chỉ chạy lại khi reset

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
              <input
                type="text"
                onKeyDown={(e) => findCustomerPayment(e)}
                onChange={(e) => setCustomerPaymentId(e.target.value)}
                value={customerPaymentId}
              />
              <div className="error-studentId">{errorStudentPayment}</div>
            </div>

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

            {isSentOtp && (
              <>
                <div className="details-form-group otp-inactive" id="otp-input">
                  <label for="">OTP code</label>
                  <input
                    type="text"
                    value={otpValue}
                    onChange={(e) => {
                      setOtpValue(e.target.value);
                    }}
                  />
                </div>
                <div className="error-studentId">{otpMsg}</div>
              </>
            )}

            {/* Button chỉ active khi info ở Tuition và Payment đc điền đủ */}
            <button
              className="confirm-btn"
              type="submit"
              disabled={!isBtnSendOtpAvailable}
            >
              {isSentOtp ? "Confirm" : "Send OTP"}
            </button>

            {isSentOtp && (
              <>
                <div className="resend-otp">
                  Didn’t receive the OTP?{" "}
                  <a
                    className={
                      !isBtnSendOtpAvailable ? "resend-disable" : "resend-btn"
                    }
                    onClick={() => handleSendOtp()}
                  >
                    Resend
                  </a>
                </div>
                <h3 className="time-left">{formatTime(timeLeft)}</h3>
              </>
            )}

            {isErrorPayment !== null && (
              <div
                className={isErrorPayment ? "error-payment" : "success-payment"}
              >
                <p>{isErrorPayment ? otpMsg : "Transaction Success"}</p>
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
