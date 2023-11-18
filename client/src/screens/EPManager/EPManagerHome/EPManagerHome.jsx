import React from 'react';
import { Outlet } from 'react-router-dom';
import "./EPManagerHome.scss";
import SideBarEPM from '../../../components/SideBarEPM/SideBarEPM';

function EPManagerHome() {
  return (
    <div className='epmHome'>
      <div className='sideBar'>
        <SideBarEPM />
      </div>

      <div className='content'>
        <Outlet />
      </div>
    </div>
  )
}

export default EPManagerHome;