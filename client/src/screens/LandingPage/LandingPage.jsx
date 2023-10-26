import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
    const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="topbar">
        <img className="topbar-child" alt="" src="/rectangle-1@2x.png" />
        <b className="magicpost">MagicPost</b>
        <div className="services">Services</div>
        <div className="tracking">Tracking</div>
        <div className="locations">Locations</div>
        <div className="rectangle-parent">
          <div className="instance-child" />
          <button className="sign-up" onClick={() => navigate("/register")}>Sign up</button>
        </div>
        <div className="log-in">Log in</div>
      </div>
      <div className="frame">
        <div className="right-part">
          <img
            className="screenshot-from-2023-10-24-09-"
            alt=""
            src="/screenshot-from-20231024-095500-1@2x.png"
          />
        </div>
        <div className="left-part">
          <b className="your-lighting-fast-delivery-container">
            <p className="your-lighting-fast">{`Your lighting-fast `}</p>
            <p className="your-lighting-fast">delivery partner</p>
          </b>
          <div className="magicpost-is-a-container">
            <p className="your-lighting-fast">{`MagicPost is a logistic company providing courier, `}</p>
            <p className="your-lighting-fast">
              package delivery and express mail service. It helps
            </p>
            <p className="your-lighting-fast">
              everyone to send documents, packages, parcels
            </p>
            <p className="your-lighting-fast">
              and letter to desired destination
            </p>
          </div>
          <img className="left-part-child" alt="" src="/line-1.svg" />
          <div className="frame1">
            <div className="expedition">
              <p className="your-lighting-fast">
                <b>
                  <span className="span">24</span>
                  <span className="span1">/</span>
                </b>
                <span>
                  <b>7</b>
                </span>
              </p>
              <p className="packages-delivered">
                <span>
                  <span>{`Expedition `}</span>
                </span>
              </p>
            </div>
            <div className="m-packages-delivered-container">
              <p className="your-lighting-fast">
                <b>
                  <span>5M</span>
                  <span className="span1">+</span>
                </b>
              </p>
              <p className="packages-delivered">{`Packages Delivered `}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
