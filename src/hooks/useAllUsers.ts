import { useState, useEffect, useContext } from "react";
import FirebaseAuthContext from "../contexts/FirebaseAuthContext";
import { getAllUsers, type User } from "../util/user";

/**
 * fetches the details of all registered users
 * @param auth 
 * @returns 
 */
const useAllUsers = (): Array<User> | null => {
    const { authState } = useContext(FirebaseAuthContext)!;
    const { auth } = authState;
    const [allUsers, setAllUsers] = useState<Array<User> | null>(null);

    useEffect(() => {
        const asyncWrapper = async () => {
            if (auth && auth.currentUser) {
                try {
                    const users = await getAllUsers();
                    setAllUsers(users);
                } catch (e) {
                    console.log("Error in getting all users: ", e);
                }
            }
        };

        asyncWrapper();
    }, [auth]);

    return allUsers;
};

export default useAllUsers;
