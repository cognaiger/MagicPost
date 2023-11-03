import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import BossImg from "../../img/bossimg.png";
import "./SideBarBoss.scss";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { useNavigate } from 'react-router-dom';
import MenuBtn from '../MenuBtn/MenuBtn';

function SideBarBoss() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState('Db');

  const handleDbClick = () => {
    navigate('/bhome');
    setActiveBtn('Db');
  }

  const handleLocationClick = () => {
    navigate('/bhome/location');
    setActiveBtn('Location');
  }

  const handleAccountClick = () => {
    navigate("/bhome/account");
    setActiveBtn("Account");
  }

  return (
    <div className='sideBar'>
      <div className='profile'>
        <img src={BossImg} />
        <div className='name'>{currentUser.name}</div>
      </div>
      <div className='menu'>
        <MenuBtn onClick={handleDbClick} isActive={activeBtn === 'Db' ? true : false}>
          <DashboardOutlinedIcon />
          <div>Dashboard</div>
        </MenuBtn>
        <MenuBtn className='option' onClick={handleLocationClick} isActive={activeBtn === 'Location' ? true : false}>
          <LocationOnOutlinedIcon />
          <div>Location</div>
        </MenuBtn>
        <MenuBtn className='option' onClick={handleAccountClick} isActive={activeBtn === 'Account' ? true : false}>
          <AccountCircleOutlinedIcon />
          <div>Account</div>
        </MenuBtn>
        <MenuBtn className='option' onClick={logout} isActive={false}>
          <ExitToAppOutlinedIcon />
          <div>Log out</div>
        </MenuBtn>
      </div>
    </div>
  )
}

export default SideBarBoss;