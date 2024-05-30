import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
        <Toaster richColors expand={true}/>
    </BrowserRouter>
  </React.StrictMode>
);
