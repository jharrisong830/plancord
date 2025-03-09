import { useState, useEffect, useContext } from "react";
import FirebaseAuthContext from "../contexts/FirebaseAuthContext";
import { signOutUser } from "../util/user";
import { getStartOfCurrentWeek } from "../util/date";
import WeekView from "./calendar/WeekView";
import { Button } from "@mui/material";
import { getUser, type User } from "../util/user";

export default function HomeView() {
    const today = new Date();
    const startDate = getStartOfCurrentWeek(today);

    const { authState } = useContext(FirebaseAuthContext)!;
    const { auth } = authState;

    const [isSigningOut, setIsSigningOut] = useState(false);

    const [currentUser, setCurrentUser] = useState<User | null>(null);

    // effect for signout
    useEffect(() => {
        const asyncWrapper = async () => {
            if (auth) {
                try {
                    await signOutUser(auth);
                    console.log("USER SIGNED OUT");
                } catch (e) {
                    console.log("Error in signing out user: ", e);
                }
            }
        };

        if (isSigningOut) {
            asyncWrapper();
        }
    }, [isSigningOut, auth]);

    // effect for getting current user's details
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


    
    return (
        <>
            {currentUser && (
                <>
                    <h1>Home</h1>
                    <Button onClick={() => setIsSigningOut(true)}>Sign Out</Button>
                    {currentUser.admin && (
                        <>
                            <h5>Admin</h5>
                            <Button>Admin Panel</Button>
                        </>
                    )}
                    <WeekView today={today} startDate={startDate} />
                </>
            )}
        </>
    )
}