import React from 'react';
import "./CPManagerHome.scss";
import { Outlet } from 'react-router-dom';
import SideBarCPM from '../../../components/SideBarCPM/SideBarCPM';

function CPManagerHome() {
  return (
    <div className='cpmHome'>
      <div className='sideBar'>
        <SideBarCPM />
      </div>

      <div className='content'>
        <Outlet />
      </div>
    </div>
  )
}

export default CPManagerHome;