import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { BankingContextProvider } from "./context/BankingContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BankingContextProvider>
      <App />
    </BankingContextProvider>
  </BrowserRouter>
);
