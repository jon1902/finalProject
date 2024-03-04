import React, { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';
import { api } from '@/config/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

interface IUserContext {
    user: any;
    isAuthenticated: boolean;
    onUpdateUser: (updatedUser: any) => void;
    onLogout: () => void;
    onLogin: (values: ISignInFormValues) => Promise<void>;
    onRegister: (values: IRegisterFormValues) => Promise<void>;
}

export interface ISignInFormValues {
    email: string;
    password: string;
}


export interface IRegisterFormValues {
    username: string;
    email: string;
    password: string;
}


export const UserContext = createContext<IUserContext>({
    isAuthenticated: false,
    user: null,
    onUpdateUser: (updatedUser: any) => {},
    onLogout: () => {},
    onLogin: async  () => {},
    onRegister: async () => {}
})

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const onUpdateUser = (updatedUser: any) => {
        if(!updatedUser?.userId) return;

        setUser(updatedUser);
        setIsAuthenticated(true);
    }

    const onLogout = async () => {
        try{
            await AsyncStorage.removeItem("token");
            setUser(null);
            setIsAuthenticated(false);
            router.navigate('(auth_tabs)')
        } catch(err) {
            console.log(err)
        }
    }

    const onLogin = async (values: ISignInFormValues) => {
        try {
          const response = await api.post('/auth/login', values)

          await AsyncStorage.setItem("token", response.data?.token)
    
          setIsAuthenticated(true)

          router.navigate('(tabs)')
        } catch(err) {
          console.log(err)
        }
    }

    const onRegister = async (values: IRegisterFormValues) => {
        try {
          const response = await api.post('/auth/register', values)

          await AsyncStorage.setItem("token", response.data?.token)
    
          setIsAuthenticated(true)

          router.navigate('(tabs)')
        } catch(err) {
          console.log(err)
        }
    }

    useEffect(() => {
        const getAuth = async () => {
            try{
                const token = await AsyncStorage.getItem('token');

                if(token){
                    // const user = jwtDecode(token)
                    // onUpdateUser(user)
                    setIsAuthenticated(true)

                    router.navigate('(tabs)')

                    return;
                }

                router.navigate('(auth_tabs)')
            }catch(err) {
                console.log(err)
            }
        }

        getAuth()
    }, [])

    const value = useMemo(() => ({
        isAuthenticated,
        user,
        onUpdateUser,
        onLogout,
        onLogin,
        onRegister
    }), [user, isAuthenticated])

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export const useUserContext  = () => {
    return useContext(UserContext)
}

