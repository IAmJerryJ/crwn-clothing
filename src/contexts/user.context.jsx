import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utils/firebase/firebase.util';

export const UserContext = createContext({
    setCurentUser: () => null,
    currentUser: null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurentUser] = useState(null);
    const value = { currentUser, setCurentUser };


    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurentUser(user);
        });
        
        return unsubscribe;
    }, []);
    return <UserContext.Provider value={ value }>{children}</UserContext.Provider>
};

