import { View, Text } from 'react-native'
import { onAuthStateChanged, User } from 'firebase/auth'
import { FIREBASE_AUTH } from '../firebase/FireBaseAuth'
import React, {createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext({} as any);


export const UserProvider = ({children} : {children: React.ReactNode}) => {

    const [isAuthenticating, setIsAuthenticating] = useState(true);
    const[user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            setUser(user);
            setIsAuthenticating(false);
        });
         return unsubscribe;
    }, []);

    const value = {
        isAuthenticating,
        setIsAuthenticating,
        user,
    }


  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};


export const useUser = () => {
    return useContext(UserContext);
}