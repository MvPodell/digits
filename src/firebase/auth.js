import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from "./firebase";
import { onAuthStateChanged } from 'firebase/auth';

const AuthUserContext = createContext({
    authUser: null,
    isLoading: true,
});

export default function useFireBaseAuth() {
    const [authUser, setAuthUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const authStateChanged = async (user) => {
        setIsLoading(true);
        if (!user) {
            setAuthUser(null);
            setIsLoading(false);
            return;
        }
        setAuthUser({
            uid: user.uid,
            email: user.email
        });
        setIsLoading(false);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, authStateChanged);
        return () => unsubscribe();
    })

    return {
        authUser,
        isLoading
    }
}

export function AuthUserProvider({ children }) {
    const auth = useFireBaseAuth();
    return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
}

export const useAuth = () => useContext(AuthUserContext);