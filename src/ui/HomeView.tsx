import { useState, useEffect, useContext } from "react";
import FirebaseAuthContext from "../contexts/FirebaseAuthContext";
import { signOutUser } from "../util/user";
import { getStartOfCurrentWeek } from "../util/date";
import WeekView from "./calendar/WeekView";
import { Button } from "@mui/material";

export default function HomeView() {
    const today = new Date();
    const startDate = getStartOfCurrentWeek(today);

    const { authState } = useContext(FirebaseAuthContext)!;
    const { auth } = authState;
    
    const [isSigningOut, setIsSigningOut] = useState(false);

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
    }, [isSigningOut]);


    
    return (
        <>
            <h1>Home</h1>
            <Button onClick={() => setIsSigningOut(true)}>Sign Out</Button>
            <WeekView today={today} startDate={startDate} />
        </>
    )
}