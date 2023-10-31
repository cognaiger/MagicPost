import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./screens/LandingPage/LandingPage";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import BossHome from "./screens/BossHome/BossHome";
import CPManagerHome from "./screens/CPManagerHome/CPManagerHome";
import ProtectedBossHome from "./screens/BossHome/ProtectedBossHome";
import { setAuthToken } from "./context/authContext";

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
        <Route path="/bhome" element={<BossHome />} />
        <Route path="cpmanagerhome" element={<CPManagerHome />} />
      </Routes>
    </div>
  );
}

export default App;
