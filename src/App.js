// toast ref:  https://fkhadra.github.io/react-toastify/introduction

// imports
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useThisAuthContext } from "./authReactH/AuthContext";
// imports for specified files
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import MyTODOs from "./pages/MyTODOs/MyTODOs";
import Activities from "pages/Activities/Activities";
import History from "./pages/History/History";
import Charts from "pages/Charts/Charts";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Singup";
import Search from "./pages/Search/Search";


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
            {user && <Route path="/search" element={<Search />} />}

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
            // toast to be displayed in top center of the page
            position="top-center"
            // toast to be closed in 5000 milliseconds
            autoClose={5000}
            // limit toast popups to 3, as user must be able to read them
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
