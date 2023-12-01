import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import BossImg from "../../img/bossimg.png";
import "./SideBarCPS.scss";
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import CallReceivedOutlinedIcon from '@material-ui/icons/CallReceivedOutlined';
import CallMadeOutlinedIcon from '@material-ui/icons/CallMadeOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import { useNavigate } from 'react-router-dom';
import MenuBtn from '../MenuBtn/MenuBtn';

const SideBarCPS = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState('Db');

  const handleDbClick = () => {
    navigate('');
    setActiveBtn('Db');
  }

  const handleBillClick = () => {
    navigate('bill');
    setActiveBtn('Bill');
  }

  const handleIncomingClick = () => {
    navigate('inorder');
    setActiveBtn('IOrder');
  }

  const handleOutgoingClick = () => {
    navigate('outorder');
    setActiveBtn('OOrder');
  }

  useEffect(() => {
    navigate('');
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
        <MenuBtn onClick={handleBillClick} isActive={activeBtn === 'Bill' ? true : false}>
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

export default SideBarCPS;