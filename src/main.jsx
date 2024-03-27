import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./component/Dataprovider/DataProvider.jsx"; 
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");
createRoot(rootElement).render(
  <React.StrictMode>

<UserProvider >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>
  
  </React.StrictMode>
  
  

);
