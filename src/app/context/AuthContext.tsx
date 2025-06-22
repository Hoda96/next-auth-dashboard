'use client'

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import React from 'react'
import { UserProps } from "../types/types";

interface AuthContextType {
    user: UserProps | null;
    login: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const route = useRouter()
    const [user, setUser] = useState<UserProps | null>(null)

    useEffect(() => {
        const UserStored = localStorage.getItem('user');
        if (UserStored) {
            setUser(JSON.parse(UserStored))
        }
    }, [])

    const login = async () => {
        const response = await fetch('https://randomuser.me/api/?results=1&nat=us')
        const data = await response.json();
        if (data && data.results && data.results.length > 0) {
            const userData = data.results[0]
            console.log('userData', userData);

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            route.push('/dashboard');
        } else {
            console.error('Failed to fetch user data');
        }

    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        route.push('/')

    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}   