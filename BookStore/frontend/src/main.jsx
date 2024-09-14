import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider>
      <App />
      <ToastContainer />
    </SnackbarProvider>
  </BrowserRouter>
);
