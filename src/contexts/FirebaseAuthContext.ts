import { createContext } from "react";

export type FirebaseAuthContextProviderProps = {
    token: string | null;
    setToken: (token: string | null) => void;
};

const FirebaseAuthContext =
    createContext<FirebaseAuthContextProviderProps | null>(null);

export default FirebaseAuthContext;
