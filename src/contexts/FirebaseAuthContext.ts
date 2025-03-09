import { createContext } from "react";
import { type Auth } from "firebase/auth";

const FirebaseAuthContext = createContext<Auth | null>(null);

export default FirebaseAuthContext;
