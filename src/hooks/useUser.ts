import { useState, useEffect } from "react";
import { getUser, type User } from "../util/user";

/**
 * fetches the details of the user with the supplied id
 * @param id
 * @returns
 */
const useUser = (
    id: string
): { user: User | null; triggerRefresh: () => void } => {
    const [user, setUser] = useState<User | null>(null);
    const [refresh, setRefresh] = useState<boolean>(true);

    const triggerRefresh = () => setRefresh(true);

    useEffect(() => {
        const asyncWrapper = async () => {
            console.log("useUser triggered!");
            try {
                const u = await getUser(id);
                setUser(u);
            } catch (e) {
                console.log("Error in getting user: ", e);
            }
            setRefresh(false);
        };

        if (refresh) asyncWrapper();
    }, [id, refresh]);

    return { user, triggerRefresh };
};

export default useUser;
