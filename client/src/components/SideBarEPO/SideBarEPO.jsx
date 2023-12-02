import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import BossImg from "../../img/bossimg.png";
import "./SideBarEPO.scss";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import CallReceivedOutlinedIcon from '@material-ui/icons/CallReceivedOutlined';
import CallMadeOutlinedIcon from '@material-ui/icons/CallMadeOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
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

  const handleIncomingClick = () => {
    navigate('iorder');
    setActiveBtn('IOrder');
  }

  const handleOutgoingClick = () => {
    navigate('oorder');
    setActiveBtn('OOrder');
  }

  const handleBillClick = () => {
    navigate("bill");
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
          <InsertDriveFileOutlinedIcon />
          <div>Bill</div>
        </MenuBtn>
        <MenuBtn className='option' onClick={handleIncomingClick} isActive={activeBtn === 'IOrder' ? true : false}>
          <CallReceivedOutlinedIcon />
          <div>Incoming Order</div>
        </MenuBtn>
        <MenuBtn className='option' onClick={handleOutgoingClick} isActive={activeBtn === 'OOrder' ? true : false}>
          <CallMadeOutlinedIcon />
          <div>Outgoing Order</div>
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