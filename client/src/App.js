import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./screens/LandingPage/LandingPage";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import CPManagerHome from "./screens/CPManager/CPManagerHome/CPManagerHome";
import { setAuthToken } from "./context/authContext";
import BHome from "./screens/Boss/BHome/BHome";
import BDashboard from "./screens/Boss/BDashboard/BDashboard";
import BAccount from "./screens/Boss/BAccount/BAccount";
import BLocation from "./screens/Boss/BLocation/BLocation";
import EPManagerHome from "./screens/EPManager/EPManagerHome/EPManagerHome";
import EPMDashboard from "./screens/EPManager/EPMDashboard/EPMDashboard";
import EPMAccount from "./screens/EPManager/EPMAccount/EPMAccount";

function App() {

  const protectedRoute = ({ children }) => {
    const token = localStorage.getItem("accessToken");
    setAuthToken(token);

    if (token === null) {
      <Navigate to="/login" />
    }
    
    return children;
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/bhome" element={<BHome />}>
          <Route path="" element={<BDashboard />} />
          <Route path="account" element={<BAccount />} />
          <Route path="location" element={<BLocation />} />
        </Route>
        <Route path="/epmhome" element={<EPManagerHome />}>
          <Route path="" element={<EPMDashboard />} />
          <Route path="account" element={<EPMAccount />} />
        </Route>
        <Route path="cpmanagerhome" element={<CPManagerHome />} />
      </Routes>
    </div>
  );
}

export default App;
