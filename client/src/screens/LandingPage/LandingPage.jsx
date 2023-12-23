import { Outlet, useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import "./LandingPage.scss";
import Button from "../../components/Button/Button";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="top">
        <div className="brand">
          <img src={logo} alt="logo" />
          <button className="text" onClick={() => navigate("/")}>MagicPost</button>
        </div>

        <div className="menu">
          <button onClick={() => navigate('service')}>Services</button>
          <button onClick={() => navigate('tracking')}>Tracking</button>
          <button onClick={() => navigate('location')}>Locations</button>
        </div>

        <div className="button">
          <button className="loginbtn" onClick={() => navigate("/login")}>Log in</button>
          <Button content={"Sign up"} onClick={() => navigate("/register")} />
        </div>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default LandingPage;
