import React from "react";
import ReactDOM from "react-dom";
import { GlobalProvider } from "./authReactH/myAuthContext";
import App from "./App";

import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Containers_React/Container.css"
import "./components/MyTODOs/TODO.css"
import "./components/History/OneHistory.css"
import "./components/Activities/Activity.css"
import "./index.css";
import "./App.css";

import "./components/Navbar/Navbar.css";
import "./pages/MyTODOs/MyTODOs.css"
import "./pages/Activities/Activities.css"
import "./pages/History/History.css"
import "./pages/Charts/Charts.css"
import "./pages/Profile/Profile.css"
import "./pages/Login/Login.css";
import "./pages/Signup/Signup.css";


ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
