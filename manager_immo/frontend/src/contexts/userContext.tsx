import React, { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

interface IUserContext {
    user: any;
    isAuthenticated: boolean;
    onUpdateUser: (updatedUser: any) => void;
    onLogout: () => void
}

export const UserContext = createContext<IUserContext>({
    isAuthenticated: false,
    user: null,
    onUpdateUser: (updatedUser: any) => {},
    onLogout: () => {}
})

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [cookies, _, removeCookie] = useCookies(["token"])
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const onUpdateUser = (updatedUser: any) => {
        if(!updatedUser?.userId) return;

        setUser(updatedUser);
        setIsAuthenticated(true);
    }

    const onLogout = () => {
        removeCookie("token");
        setUser(null);
        setIsAuthenticated(false);
        toast.success("You are now logged out !")
    }

    useEffect(() => {
        //TODO: mettre à jour
        const { token } = cookies;

        if(token){
            const user = jwtDecode(token)
            onUpdateUser(user)
        }
    }, [cookies])

    const value = useMemo(() => ({
        isAuthenticated,
        user,
        onUpdateUser,
        onLogout
    }), [user, isAuthenticated])

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}

export const useUserContext  = () => {
    return useContext(UserContext)
}

