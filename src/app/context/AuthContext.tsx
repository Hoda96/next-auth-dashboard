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
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
            if (!response.ok) {
                console.error('Failed to fetch user data:', response.statusText);
                throw new Error('Failed to fetch user data');
            }
            const userData = await response.json();
            console.log('userData', userData);

            if (userData) {
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
                route.push('/dashboard');
            } else {
                console.error('No user data received');
                throw new Error('No user data received');
            }
        } catch (error) {
            console.error('Login fetch error:', error);
            throw error; // Propagate the error to handleSubmit
        }
    };

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