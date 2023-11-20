import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import BossImg from "../../img/bossimg.png";
import "./SideBarEPO.scss";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { useNavigate } from 'react-router-dom';
import MenuBtn from '../MenuBtn/MenuBtn';

const SideBarEPO = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState('Db');

  const handleDbClick = () => {
    navigate('/epohome');
    setActiveBtn('Db');
  }

  const handleShipmentClick = () => {
    navigate('/epohome/order');
    setActiveBtn('Order');
  }

  const handleBillClick = () => {
    navigate("/epohome/bill");
    setActiveBtn("Bill");
  }

  useEffect(() => {
    navigate('/epohome');
  }, [])

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
        <MenuBtn className='option' onClick={handleBillClick} isActive={activeBtn === 'Bill' ? true : false}>
          <LocationOnOutlinedIcon />
          <div>Bill</div>
        </MenuBtn>
        <MenuBtn className='option' onClick={handleShipmentClick} isActive={activeBtn === 'Order' ? true : false}>
          <AccountCircleOutlinedIcon />
          <div>Ship Order</div>
        </MenuBtn>
        <MenuBtn className='option' onClick={logout} isActive={false}>
          <ExitToAppOutlinedIcon />
          <div>Log out</div>
        </MenuBtn>
      </div>
    </div>
  )
}

export default SideBarEPO;