import firestore from "../firebase/firestore";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    type Auth
} from "firebase/auth";
import { setDoc, getDoc, getDocs, doc, collection } from "firebase/firestore";
import { setupAuthForCreatingUser } from "../firebase/auth";

export type User = {
    id: string;
    userName: string;
    email: string;
    displayName: string;
    admin: boolean;
};

export const createUser = async (
    userName: string,
    email: string,
    displayName: string,
    admin: boolean,
    password: string
): Promise<User> => {
    const auth = await setupAuthForCreatingUser();
    const db = firestore();

    userName = userName.trim();
    email = email.trim();
    displayName = displayName.trim();
    password = password.trim();

    try {
        const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = credential.user;

        console.log("User created: ", user.uid);
        await signOutUser(auth); // sign this user out of this auth instance

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

export const getUser = async (id: string): Promise<User> => {
    const db = firestore();
    try {
        const docRef = doc(db, "users", id); // get the user with the provided id
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const user = docSnap.data() as User;
            return user;
        }
        throw new Error(`No such user with ID ${id}`);
    } catch (e) {
        console.log("Error in getting user: ", e);
        throw e;
    }
};

export const signInUser = async (
    auth: Auth,
    email: string,
    password: string
): Promise<void> => {
    email = email.trim();
    password = password.trim();

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
        await signOut(auth);
    } catch (e) {
        console.log("Error in signing out user: ", e);
        throw e;
    }
};

export const getAllUsers = async (): Promise<Array<User>> => {
    const db = firestore();
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        return querySnapshot.docs.map((d) => d.data() as User);
    } catch (e) {
        console.log("Error in getting all users: ", e);
        throw e;
    }
};

export const updateUser = async (user: User): Promise<void> => {
    const db = firestore();

    user.userName = user.userName.trim();
    user.email = user.email.trim();
    user.displayName = user.displayName.trim();

    try {
        await setDoc(doc(db, "users", user.id), user);
        console.log("Document updated with ID: ", user.id);
    } catch (e) {
        console.log("Error in updating user: ", e);
        throw e;
    }
};
