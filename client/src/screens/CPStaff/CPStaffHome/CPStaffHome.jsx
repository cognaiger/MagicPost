import React from 'react';
import "./CPStaffHome.scss";
import { Outlet } from 'react-router-dom';
import SideBarCPS from '../../../components/SideBarCPS/SideBarCPS';

const CPSHome = () => {
    return (
        <div className='staffHome'>
            <div className='sideBar'>
                <SideBarCPS />
            </div>

            <div className='content'>
                <Outlet />
            </div>
        </div>
    )
}

export default CPSHome;