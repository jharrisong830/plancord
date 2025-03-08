import app from "./configuration";
import { getFirestore } from "firebase/firestore";

const firestore = () => getFirestore(app);

export default firestore;
