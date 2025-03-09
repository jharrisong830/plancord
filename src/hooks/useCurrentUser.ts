import { useState, useEffect, useContext } from "react";
import FirebaseAuthContext from "../contexts/FirebaseAuthContext";
import { getUser, type User } from "../util/user";

/**
 * fetches the details of the currently authenticated user 
 * @returns 
 */
const useCurrentUser = (): User | null => {
    const { authState } = useContext(FirebaseAuthContext)!;
    const { auth } = authState;
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const asyncWrapper = async () => {
            if (auth && auth.currentUser) {
                try {
                    const user = await getUser(auth.currentUser.uid);
                    setCurrentUser(user);
                } catch (e) {
                    console.log("Error in getting user: ", e);
                }
            }
        };

        asyncWrapper();
    }, [auth]);

    return currentUser;
};

export default useCurrentUser;
