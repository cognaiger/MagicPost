import React from 'react';
import "./EPOHome.scss";
import { Outlet } from 'react-router-dom';
import SideBarEPO from '../../../components/SideBarEPO/SideBarEPO';

const EPOHome = () => {
    return (
        <div className='bossHome'>
            <div className='sideBar'>
                <SideBarEPO />
            </div>

            <div className='content'>
                <Outlet />
            </div>
        </div>
    )
}

export default EPOHome;