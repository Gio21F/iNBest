"use client";
import { FC, useReducer, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';
import { AuthContext, authReducer } from './';
import { IUser } from './AuthContext';
import axiosInstance from '@/app/api/axiosInstance';

interface Props {
    children: ReactNode
}
export interface AuthState {
    isLoggedIn: boolean;
    user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined,
}

export const AuthProvider:FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( authReducer, AUTH_INITIAL_STATE );
    const router = useRouter();

    useEffect(() => {
        checkToken();
    }, [])

    const checkToken = async() => {
        try {
            const { data } = await axiosInstance.post('/auth/check-status');
            const { token, user } = data;
            localStorage.setItem('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
        } catch (error) {}
    }

    const loginUser = async( email: string, password: string ): Promise<{hasError: boolean; message?: string}> => {
        try {
            const { data } = await axiosInstance.post('/auth/signin', { email, password });
            const { token, user } = data;
            localStorage.setItem('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            return { hasError: false }
        } catch (error: any ) {
            return { hasError: true, message: error.response.data.message};
        }

    }

    const registerUser = async( name: string, email: string, password: string ): Promise<{hasError: boolean; message?: string}> => {
        try {
            const { data } = await axiosInstance.post('/auth/signup', { name, email, password });
            const { token, user } = data;
            localStorage.setItem('token', token);
            dispatch({ type: '[Auth] - Login', payload: user });
            return {
                hasError: false
            }

        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }
            return {
                hasError: true,
                message: 'No se pudo crear el usuario - intente de nuevo'
            }
        }
    }

    const logout = () => {
        dispatch({ type: '[Auth] - Logout' });
        localStorage.removeItem('token');
        router.push('/auth/signin');
    }

    return (
        <AuthContext.Provider value={{
            ...state,

            // Methods
            loginUser,
            registerUser,
            logout

        }}>
            { children }
        </AuthContext.Provider>
    )
};