import { useState, useEffect, useContext } from "react";
import FirebaseAuthContext from "../contexts/FirebaseAuthContext";
import { getUserByUid, type User } from "../util/user";

/**
 * fetches the details of the currently authenticated user
 * TODO: option to refresh
 * @returns
 */
const useCurrentUser = (): {
    currentUser: User | null;
    triggerRefresh: () => void;
} => {
    const { authState } = useContext(FirebaseAuthContext)!;
    const { auth } = authState;
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [refresh, setRefresh] = useState<boolean>(true);

    const triggerRefresh = () => setRefresh(true);

    useEffect(() => {
        const asyncWrapper = async () => {
            if (auth && auth.currentUser) {
                try {
                    const user = await getUserByUid(auth.currentUser.uid);
                    setCurrentUser(user);
                } catch (e) {
                    console.log("Error in getting user: ", e);
                }
            }
            setRefresh(false);
        };

        if (refresh) asyncWrapper();
    }, [auth, refresh]);

    return { currentUser, triggerRefresh };
};

export default useCurrentUser;
