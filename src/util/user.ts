import firestore from "../firebase/firestore";
import firebaseAuth from "../firebase/auth";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export type User = {
    id: string;
    userName: string;
    email: string;
    displayName: string;
    admin: boolean;
};

export const createUser = async (userName: string, email: string, displayName: string, admin: boolean, password: string): Promise<User> => {
    const auth = firebaseAuth();
    const db = firestore();
    try {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        const user = credential.user;

        console.log("User created: ", user.uid);

        const newUser: User = {
            id: user.uid,
            userName,
            email,
            displayName,
            admin
        };

        await setDoc(doc(db, "users", newUser.id), newUser);
        console.log("Document written with ID: ", newUser.id);
        return newUser;
    } catch (e) {
        console.log("Error in creating new user: ", e);
        throw e;
    }
};

export const signInUser = async (email: string, password: string): Promise<void> => {
    const auth = firebaseAuth();
    try { 
        const credential = await signInWithEmailAndPassword(auth, email, password);
        const user = credential.user;
        console.log(user);
    } catch (e) {
        console.log("Error in signing in user: ", e);
        throw e;
    }
};
