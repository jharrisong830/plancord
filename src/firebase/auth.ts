import app from "./configuration";
import { getAuth } from "firebase/auth";

const firebaseAuth = () => getAuth(app);

export default firebaseAuth;
