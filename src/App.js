// toast ref:  https://fkhadra.github.io/react-toastify/introduction

// imports
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useThisAuthContext } from "./authReactH/AuthContext";

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import MyTODOs from "./pages/MyTODOs/MyTODOs";
import Activities from "pages/Activities/Activities";
import History from "./pages/History/History";
import Charts from "pages/Charts/Charts";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Singup";


function App() {
  const { isAuthReady, user } = useThisAuthContext();

  return (
    <div className="app shadow">
      {isAuthReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            {user && <Route path="/" element={<Home />} />}
            {user && <Route path="/mytodos" element={<MyTODOs />} />}
            {user && <Route path="/activities" element={<Activities />} />}
            {user && <Route path="/history" element={<History />} />}
            {user && <Route path="/charts" element={<Charts />} />}
            {user && <Route path="/profile" element={<Profile />} />}

            <Route path="/" element={<Navigate replace to="/login" />} />
            {!user && <Route path="/login" element={<Login />} />}
            <Route path="/login" element={<Navigate replace to="/" />} />
            {!user && <Route path="/signup" element={<Signup />} />}
            <Route path="/signup" element={<Navigate replace to="/" />} />
          </Routes>
          <ToastContainer
            pauseOnFocusLoss
            draggable
            pauseOnHover
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            position="top-center"
            autoClose={5000}
            limit={3}
            theme="colored"
            // theme="dark"
          />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
