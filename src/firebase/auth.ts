import app from "./configuration";
import { getAuth, browserSessionPersistence, type Auth } from "firebase/auth";

const setupAuth = async (): Promise<Auth> => {
    const auth = getAuth(app);
    await auth.setPersistence(browserSessionPersistence);
    return auth;
};

export default setupAuth;
