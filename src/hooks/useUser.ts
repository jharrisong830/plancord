import { useState, useEffect } from "react";
import { getUser, type User } from "../util/user";

/**
 * fetches the details of the user with the supplied id
 * @param id
 * @returns 
 */
const useUser = (id: string): User | null => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const asyncWrapper = async () => {
            console.log("useUser triggered!")    
            try {
                    const u = await getUser(id);
                    setUser(u);
                } catch (e) {
                    console.log("Error in getting user: ", e);
                }
        };

        asyncWrapper();
    }, []);

    return user;
};

export default useUser;
