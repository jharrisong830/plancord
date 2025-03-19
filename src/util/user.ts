import firestore from "../firebase/firestore";
import { v4 as uuid } from "uuid";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    type Auth
} from "firebase/auth";
import {
    setDoc,
    getDoc,
    getDocs,
    doc,
    collection,
    query,
    where
} from "firebase/firestore";

export type User = {
    uid?: string;
    regId: string;
    userName: string;
    email: string;
    displayName: string;
    admin: boolean;
};

/**
 * registers a user with firebase auth, checks that their email and regId match what is in firestore before the account can be registered
 * @param email
 * @param password
 * @param regId
 */
export const registerUser = async (
    auth: Auth,
    email: string,
    password: string,
    regId: string
): Promise<User> => {
    const db = firestore();
    email = email.trim();

    try {
        const docRef = doc(db, "users", regId); // get the user with the provided id
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const user = docSnap.data() as User;

            if (user.uid)
                throw new Error(
                    `User with ID ${regId} is already registered with firebase auth`
                );
            if (user.regId !== regId)
                throw new Error(
                    `Registration ID does not match for user with ID ${regId}`
                );
            if (user.email !== email)
                throw new Error(
                    `Email does not match for user with ID ${regId}`
                );

            const credential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(
                "User registered with firebase auth (firebase user id): ",
                credential.user.uid
            );

            await setDoc(doc(db, "users", user.regId), {
                ...user,
                uid: credential.user.uid,
                registered: true
            });
            console.log("Document written with ID: ", user.regId);

            return user;
        } else throw new Error(`No such user with ID ${regId}`);
    } catch (e) {
        console.log("Error in registering new user: ", e);
        throw e;
    }
};

/**
 * adds a user document to firestore, the user will have to use their id to register their account when they log in the first time
 * @param userName
 * @param email
 * @param displayName
 * @param admin
 * @returns
 */
export const createUser = async (
    userName: string,
    email: string,
    displayName: string,
    admin: boolean
): Promise<User> => {
    const db = firestore();

    userName = userName.trim();
    email = email.trim();
    displayName = displayName.trim();

    try {
        const newUser: User = {
            regId: uuid(),
            userName,
            email,
            displayName,
            admin
        };

        await setDoc(doc(db, "users", newUser.regId), newUser);
        console.log("Document written with ID: ", newUser.regId);
        return newUser;
    } catch (e) {
        console.log("Error in creating new user: ", e);
        throw e;
    }
};

export const getUser = async (regId: string): Promise<User> => {
    const db = firestore();
    try {
        const docRef = doc(db, "users", regId); // get the user with the provided id
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const user = docSnap.data() as User;
            return user;
        }
        throw new Error(`No such user with ID ${regId}`);
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
        await setDoc(doc(db, "users", user.regId), user);
        console.log("Document updated with ID: ", user.regId);
    } catch (e) {
        console.log("Error in updating user: ", e);
        throw e;
    }
};

export const getUserByUid = async (uid: string): Promise<User> => {
    const db = firestore();
    try {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot.docs.length);
        if (querySnapshot.docs.length === 1) {
            return querySnapshot.docs[0].data() as User;
        }
        throw new Error(`No such user with UID ${uid}`);
    } catch (e) {
        console.log("Error in getting user: ", e);
        throw e;
    }
};
