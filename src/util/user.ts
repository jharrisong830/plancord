import firestore from "../firebase/firestore";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    type Auth
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export type User = {
    id: string;
    userName: string;
    email: string;
    displayName: string;
    admin: boolean;
};

export const createUser = async (
    auth: Auth,
    userName: string,
    email: string,
    displayName: string,
    admin: boolean,
    password: string
): Promise<User> => {
    const db = firestore();
    try {
        const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
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

export const signInUser = async (
    auth: Auth,
    email: string,
    password: string
): Promise<void> => {
    try {
        const credential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = credential.user;
        console.log(user);
    } catch (e) {
        console.log("Error in signing in user: ", e);
        throw e;
    }
};

export const signOutUser = async (auth: Auth): Promise<void> => {
    try {
        await auth.signOut();
    } catch (e) {
        console.log("Error in signing out user: ", e);
        throw e;
    }
};
