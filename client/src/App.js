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
import EPOHome from "./screens/EPOperator/EPOperatorHome/EPOHome";
import EPODashboard from "./screens/EPOperator/EPODashboard/EPODashboard";
import EPOBill from "./screens/EPOperator/EPOBill/EPOBill";
import EPOBillDetail from "./screens/EPOperator/EPOBillDetail/EPOBillDetail";
import CPMDashboard from "./screens/CPManager/CPManagerDashboard/CPMDashboard";
import CPMAccount from "./screens/CPManager/CPManagerAccount/CPMAccount";
import CPSHome from "./screens/CPStaff/CPStaffHome/CPStaffHome";
import CPSDashboard from "./screens/CPStaff/CPSDashboard/CPSDashboard";
import CPSInOrder from "./screens/CPStaff/CPSInOrder/CPSInOrder";
import CPSOutOrder from "./screens/CPStaff/CPSOutOrder/CPSOutOrder";
import CPSBill from "./screens/CPStaff/CPSBill/CPSBill";
import CPSBillDetail from "./screens/CPStaff/CPSBillDetail/CPSBillDetail";
import EPOInOrder from "./screens/EPOperator/EPOInOrder/EPOInOrder";
import EPOOutOrder from "./screens/EPOperator/EPOOutOrder/EPOOutOrder";
import EPOReceiveBill from "./screens/EPOperator/EPOReceiveBill/EPOReceiveBill";
import EPOOrderDetail from "./screens/EPOperator/EPOOrderDetail/EPOOrderDetail";

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
        <Route path="/epohome" element={<EPOHome />}>
          <Route path="" element={<EPODashboard />} />
          <Route path="iorder" element={<EPOInOrder />} />
          <Route path="oorder" element={<EPOOutOrder />} />
          <Route path="sbill" element={<EPOBill />} />
          <Route path="bill/:id" element={<EPOBillDetail />} />
          <Route path="rbill" element={<EPOReceiveBill />} />
          <Route path="order/:id" element={<EPOOrderDetail />} />
        </Route>
        <Route path="/cpmhome" element={<CPManagerHome />}>
          <Route path="" element={<CPMDashboard />} />
          <Route path="account" element={<CPMAccount />} />
        </Route>
        <Route path="/cpshome" element={<CPSHome />}>
          <Route path="" element={<CPSDashboard />} />
          <Route path="bill" element={<CPSBill />} />
          <Route path="inorder" element={<CPSInOrder />} />
          <Route path="outorder" element={<CPSOutOrder />} />
          <Route path="bill/:id" element={<CPSBillDetail /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
