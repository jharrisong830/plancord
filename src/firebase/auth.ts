import { type SetAuthStateFunctionHeader } from "../contexts/FirebaseAuthContext";
import app from "./configuration";
import {
    getAuth,
    onAuthStateChanged,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
    type Auth
} from "firebase/auth";

/** creates a new Auth instance with session persistence, updates application state so it can be used with context provider throughout the entire application */
const setupAuth = async (
    setAuthState: SetAuthStateFunctionHeader
): Promise<void> => {
    const auth = getAuth(app);
    await setPersistence(auth, browserSessionPersistence);
    onAuthStateChanged(auth, (user) => {
        // add an observer to change state when user logs in or out
        setAuthState({ auth, isAuth: user !== null }); // true if logged in, false if not
    });

    setAuthState({ auth, isAuth: auth.currentUser !== null }); // set the initial state when called
};

/** returns a new auth instance with local persistence. state is not updated, so that the newly created user does not replace the current admin user */
export const setupAuthForCreatingUser = async (): Promise<Auth> => {
    // TODO: does not work, just signs out regardless
    const auth = getAuth(app);
    await setPersistence(auth, browserLocalPersistence);
    return auth;
};

export default setupAuth;
