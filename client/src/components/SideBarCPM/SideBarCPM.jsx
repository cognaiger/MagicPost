import React, { useContext, useEffect, useState } from 'react';
import "./SideBarCPM.scss";
import { AuthContext } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import MenuBtn from '../MenuBtn/MenuBtn';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import BossImg from "../../img/bossimg.png";

const SideBarCPM = () => {
    const { currentUser, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeBtn, setActiveBtn] = useState('Db');

    const handleDbClick = () => {
        navigate('');
        setActiveBtn('Db');
    }

    const handleAccountClick = () => {
        navigate("account");
        setActiveBtn("Account");
    }

    useEffect(() => {
        navigate("");
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

export default SideBarCPM;