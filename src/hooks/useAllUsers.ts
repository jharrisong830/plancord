import { useState, useEffect } from "react";
import { getAllUsers, type User } from "../util/user";

/**
 * fetches the details of all registered users
 * @returns
 */
const useAllUsers = (): Array<User> | null => {
    const [allUsers, setAllUsers] = useState<Array<User> | null>(null);

    useEffect(() => {
        const asyncWrapper = async () => {
            try {
                const users = await getAllUsers();
                setAllUsers(users);
            } catch (e) {
                console.log("Error in getting all users: ", e);
            }
        };

        asyncWrapper();
    }, []);

    return allUsers;
};

export default useAllUsers;
