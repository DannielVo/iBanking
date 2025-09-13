import React from "react";
import Login from "./pages/login/Login";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Profile from "./pages/profile/Profile";
import { Navigate, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace></Navigate>}
        ></Route>

        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
};

export default App;
