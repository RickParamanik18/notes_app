import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            setUser({ token });
        } else {
            delete axios.defaults.headers.common["Authorization"];
            setUser(null);
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/login`,
            {
                email,
                password,
            },
        );
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
    };

    const register = async (email, password) => {
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/register`,
            { email, password },
        );
        console.log(res);
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setUser(res.data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ user, token, loading, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
