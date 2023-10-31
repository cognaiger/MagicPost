import React, { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import BossImg from "../../img/bossimg.png";
import "./SideBarBoss.scss";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { useNavigate } from 'react-router-dom';

function SideBarBoss() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className='sideBar'>
      <div className='profile'>
        <img src={BossImg} />
        <div className='name'>{currentUser.name}</div>
      </div>
      <div className='menu'>
        <button className='option' onClick={() => navigate("/bhome")}>
          <DashboardOutlinedIcon />
          <div>Dashboard</div>
        </button>
        <button className='option' onClick={() => navigate("/bhome/location")}>
          <LocationOnOutlinedIcon />
          <div>Location</div>
        </button>
        <button className='option' onClick={() => navigate("/bhome/account")}>
          <AccountCircleOutlinedIcon />
          <div>Account</div>
        </button>
        <button className='option' onClick={logout}>
          <ExitToAppOutlinedIcon />
          <div>Log out</div>
        </button>
      </div>
    </div>
  )
}

export default SideBarBoss;