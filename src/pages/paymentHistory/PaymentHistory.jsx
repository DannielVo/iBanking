import React, { useEffect, useState } from "react";
import "./paymentHistory.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useBanking } from "../../context/BankingContext";
import { CURRENCY } from "../../assets/assets";

const PaymentHistory = () => {
  const { customerId, fetchPaidPayment, semesters, payments } = useBanking();
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedSemesters, setSelectedSemesters] = useState("");
  const [paymentsSrc, setPaymentsSrc] = useState(payments || []);

  function handleSemesterChange(e) {
    const semesterInput = e.target.value;
    setSelectedSemesters(semesterInput);

    if (semesterInput === "") {
      setPaymentsSrc(payments);
    } else {
      const filterValue = payments.filter(
        (item) => item.semester === semesterInput
      );
      setPaymentsSrc(filterValue);
    }
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchPaidPayment(customerId);
      } catch (error) {
        if (error.status_code === 404) {
          setErrorMsg("No paid payments found!");
        } else if (error.status_code === 500) {
          setErrorMsg("Oops! Something went wrong. Please try again later!");
        } else {
          setErrorMsg(error.detail);
        }
        // setErrorMsg(error.message);
      }
    };

    loadData();
  }, [customerId]);

  useEffect(() => {
    setPaymentsSrc(payments);
  }, [payments]);

  return (
    <>
      <Header />
      <div className="history-wrapper">
        <div className="history-container">
          <h2 className="history-title">Payment History</h2>
          {errorMsg !== "" ? (
            <div className="error-msg">{errorMsg}</div>
          ) : (
            <>
              {" "}
              <div className="history-form-group">
                <label>Semester</label>
                <select
                  className="history-select"
                  value={selectedSemesters}
                  onChange={handleSemesterChange}
                >
                  <option value="">-- Select semester --</option>
                  {semesters.map((item, index) => (
                    <option value={item} key={`semester${index}`}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <table className="history-table">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Student ID</th>
                    <th>Amount</th>
                    <th>Date of payment</th>
                    <th>Semester</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {paymentsSrc.map((item, index) => (
                    <tr key={`payment${index}`}>
                      <td>{index + 1}</td>
                      <td>{item.customerId}</td>
                      <td>{item.amount + " " + CURRENCY} </td>
                      <td>
                        {new Date(item.datePayment)
                          .toLocaleDateString("vi-VN")
                          .replaceAll("/", "-")}
                      </td>
                      <td>{item.semester}</td>
                      <td>{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentHistory;
