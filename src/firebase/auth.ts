import { type SetAuthStateFunctionHeader } from "../contexts/FirebaseAuthContext";
import app from "./configuration";
import { getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth";

const setupAuth = async (setAuthState: SetAuthStateFunctionHeader): Promise<void> => {
    const auth = getAuth(app);
    await setPersistence(auth, browserSessionPersistence);
    onAuthStateChanged(auth, (user) => { // add an observer to change state when user logs in or out
        setAuthState({ auth, isAuth: user !== null }); // true if logged in, false if not
    });

    setAuthState({ auth, isAuth: auth.currentUser !== null }); // set the initial state when called
};

export default setupAuth;
