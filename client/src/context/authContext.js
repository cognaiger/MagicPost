import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { ROLE } from '../common/const';

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem('user') || null)
    );
    const [currentPoint, setCurrentPoint] = useState(
        JSON.parse(localStorage.getItem('point') || null)
    );

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:2504/auth/login", {
                email: email,
                password: password
            })

            if (response.status === 201) {
                const accessToken = response.data.accessToken;
                localStorage.setItem('accessToken', accessToken);
                setAuthToken(accessToken);
                const payload = jwtDecode(accessToken);
                const user = {
                    id: payload['id'],
                    role: payload['role'],
                    name: response.data.name,                    
                }
                let point;
                if (payload['role'] === ROLE.EPMANAGER || payload['role'] === ROLE.EPOPERATOR) {
                    point = {
                        epoint: response.data.epoint,
                        branch: response.data.branch,
                        associatedPoint: response.data.associatedPoint
                    }
                } else if (payload['role'] === ROLE.CPMANAGER || payload['role'] === ROLE.CPSTAFF) {
                    point = {
                        cpoint: response.data.cpoint,
                        branch: response.data.branch,
                    }
                }
                setCurrentUser(user);
                setCurrentPoint(point);
                console.log(point);

                if (user.role === ROLE.BOSS) {
                    navigate("/bhome");
                } else if (user.role === ROLE.EPMANAGER) {
                    navigate("/epmhome");
                } else if (user.role === ROLE.EPOPERATOR) {
                    navigate("/epohome");
                } else if (user.role === ROLE.CPSTAFF) {
                    navigate("/cpshome");
                } else if (user.role === ROLE.CPMANAGER) {
                    navigate("/cpmhome");
                } else {
                    navigate("/")
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    const logout = () => {
        setCurrentUser(null);
        setCurrentPoint(null);
        navigate('/login');
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
        localStorage.setItem('point', JSON.stringify(currentPoint));
    }, [currentUser, currentPoint]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, currentPoint }}>
            {children}
        </AuthContext.Provider>
    )
}