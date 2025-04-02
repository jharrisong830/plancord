import { useState, useEffect } from "react";
import { getAllUsers, type User } from "../util/user";

/**
 * fetches the details of all registered users
 * @returns
 */
const useAllUsers = (): {
    allUsers: Array<User> | null;
    triggerRefresh: () => void;
} => {
    const [allUsers, setAllUsers] = useState<Array<User> | null>(null);
    const [refresh, setRefresh] = useState<boolean>(true);

    const triggerRefresh = () => setRefresh(true);

    useEffect(() => {
        const asyncWrapper = async () => {
            try {
                const users = await getAllUsers();
                setAllUsers(users);
            } catch (e) {
                console.log("Error in getting all users: ", e);
            }
            setRefresh(false);
        };

        if (refresh) asyncWrapper();
    }, [refresh]);

    return { allUsers, triggerRefresh };
};

export default useAllUsers;
