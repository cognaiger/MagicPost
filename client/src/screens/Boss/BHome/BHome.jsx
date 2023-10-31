import React from 'react';
import "./BHome.scss";
import SideBarBoss from '../../../components/SideBarBoss/SideBarBoss';
import { Outlet } from 'react-router-dom';

function BHome() {
  return (
    <div className='bossHome'>
      <div className='sideBar'>
        <SideBarBoss />
      </div>

      <div className='content'>
        <Outlet />
      </div>
    </div>
  )
}

export default BHome;