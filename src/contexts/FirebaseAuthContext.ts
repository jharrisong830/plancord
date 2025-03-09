import { createContext } from "react";
import { type Auth } from "firebase/auth";

export type FirebaseAuthContextValues = {
    auth: Auth | null;
    isAuth: boolean; // true => signed in, false => not
};

export type SetAuthStateFunctionHeader = (setter: FirebaseAuthContextValues | ((prev: FirebaseAuthContextValues) => FirebaseAuthContextValues)) => void;

export type FirebaseAuthContextProviderProps = {
    authState: FirebaseAuthContextValues;
    setAuthState:  SetAuthStateFunctionHeader;
};

export const emptyFirebaseAuthContextValues = (): FirebaseAuthContextValues => ({
    auth: null,
    isAuth: false
});

const FirebaseAuthContext = createContext<FirebaseAuthContextProviderProps | null>(null);

export default FirebaseAuthContext;
