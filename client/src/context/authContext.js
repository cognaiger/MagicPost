import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import jwtDecode from 'jwt-decode';

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
                    epoint: response.data.epoint,
                    cpoint: response.data.cpoint,
                    branch: response.data.branch,
                }
                console.log(user);
                setCurrentUser(user);

                if (user.role === "Boss") {
                    navigate("/bhome");
                } else if (user.role === "EPManager") {
                    navigate("/epmhome");
                } else if (user.role === "EPOperator") {
                    navigate("/epohome");
                } else if (user.role === "CPStaff") {
                    navigate("/cpshome");
                } else if (user.role === "CPManager") {
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
        navigate('/login');
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}