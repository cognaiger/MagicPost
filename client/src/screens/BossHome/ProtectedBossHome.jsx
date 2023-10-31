import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const ProtectedBossHome = (props) => {
    const navigate = useNavigate();

    const token = localStorage.getItem("accessToken");
    const presentPage = () => {
        navigate(-1);
    }

    useEffect(() => {
        if (token && jwtDecode(token).role !== "Boss") {
            presentPage();
        } 
    }, [token])

    if (!token) return <Navigate to="/" />

    const decodedData = jwtDecode(token);

    if (decodedData.role === "Boss") {
        return <Outlet {...props} />
    } else {
        presentPage();
    }
}

export default ProtectedBossHome;