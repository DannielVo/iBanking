import React from "react";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";
import PaymentHistory from "./pages/paymentHistory/PaymentHistory";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace></Navigate>}
        ></Route>

        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/history"
          element={
            <PrivateRoute>
              <PaymentHistory />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
