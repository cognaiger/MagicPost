import React, { useState } from 'react';
import "./BHome.scss";
import SideBarBoss from '../../../components/SideBarBoss/SideBarBoss';
import { Outlet } from 'react-router-dom';

function BHome() {
  const [activeBtn, setActiveBtn] = useState("Db");

  return (
    <div className='bossHome'>
      <div className='sideBar'>
        <SideBarBoss activeBtn={activeBtn} setActiveBtn={setActiveBtn} />
      </div>

      <div className='content'>
        <Outlet />
      </div>
    </div>
  )
}

export default BHome;