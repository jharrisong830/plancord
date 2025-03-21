import { useState, useEffect, useContext } from "react";
import FirebaseAuthContext from "../contexts/FirebaseAuthContext";
import { signOutUser } from "../util/user";
import { getStartOfCurrentWeek } from "../util/date";
import AdminHomeView from "./admin/AdminHomeView";
import { Button, CircularProgress } from "@mui/material";
import { type User } from "../util/user";
import useCurrentUser from "../hooks/useCurrentUser";

import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";

export default function HomeView() {
    const localizer = dayjsLocalizer(dayjs);
    const today = new Date();
    const startDate = getStartOfCurrentWeek(today);

    const { authState } = useContext(FirebaseAuthContext)!;
    const { auth } = authState;

    const [isSigningOut, setIsSigningOut] = useState(false);
    const [view, setView] = useState<"home" | "admin" | "week">("home");

    const currentUser: User | null = useCurrentUser();

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

    switch (view) {
        case "home":
            if (currentUser) {
                return (
                    <>
                        <h1>Home</h1>
                        <Button onClick={() => setIsSigningOut(true)}>
                            Sign Out
                        </Button>
                        <h4>
                            {currentUser.displayName} (@
                            {currentUser.userName})
                        </h4>
                        {currentUser.admin && (
                            <>
                                <h5>Admin</h5>
                                <Button onClick={() => setView("admin")}>
                                    Admin Panel
                                </Button>
                            </>
                        )}
                        <Calendar
                            localizer={localizer}
                            events={[]}
                            defaultDate={startDate}
                            style={{ height: 500 }}
                        />
                    </>
                );
            }
            return <CircularProgress />;
        case "admin":
            return <AdminHomeView goBack={() => setView("home")} />;
    }
}
