import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../img/logo.png";
import map from "../../img/mapbig.png";
import "./LandingPage.scss";
import Button from "../../components/Button/Button";
import TrackingBar from "../../components/TrackingBar/TrackingBar"

const LandingPage = () => {
    const navigate = useNavigate();
    const [content, setContent] = useState('services');

    // Temporary
    const Services = () => {
      return (
        <>
          <div className="left">
            <div className="ti1">Your lighting-fast delivery partner</div>
            <div className="ti2">MagicPost is a logistic company providing courier, package delivery and express mail service. It helps everyone to send
              documents, packages, parcels and letter to desired destination
            </div>
            <div className="line"></div>
            <div className="statistic">
              <div>24/7 Expedition</div>
              <div>5M+ Packages Delivered</div>
            </div>
          </div>
          <div className="right">
            <img src={map} alt="map" />
        </div>
        </>
      )
    }

  return (
    <div className="page">
      <div className="top">
        <div className="brand">
          <img src={logo} alt="logo" />
          <div className="text">MagicPost</div>
        </div>

        <div className="menu">
          <button onClick={() => setContent('services')}>Services</button>
          <button onClick={() => setContent('tracking')}>Tracking</button>
          <button onClick={() => setContent('locations')}>Locations</button>
        </div>

        <div className="button">
          <button className="loginbtn" onClick={() => navigate("/login")}>Log in</button>
          <Button content={"Sign up"} onClick={() => navigate("/register")} />
        </div>
      </div>

      <div className="content">
          {content == 'services' && <Services/>}
          {content == 'tracking' && <TrackingBar/>}
      </div>
    </div>
  );
};

export default LandingPage;
