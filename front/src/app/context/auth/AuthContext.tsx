"use client";
import { createContext } from 'react';

export interface IUser {
    id: number;
    name: string;
    email: string;
}

interface ContextProps {
    isLoggedIn: boolean;
    user?: IUser;

    loginUser: (email: string, password: string) => Promise<{hasError: boolean; message?: string}> ;
    registerUser: (name: string, email: string, password: string) => Promise<{ hasError: boolean; message?: string; }>;
    logout: () => void;
}


export const AuthContext = createContext({} as ContextProps );