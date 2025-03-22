import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import FirebaseAuthContext from "../contexts/FirebaseAuthContext";
import { signOutUser } from "../util/user";
import AdminHomeView from "./admin/AdminHomeView";
import { Button, CircularProgress } from "@mui/material";
import { type User } from "../util/user";
import useCurrentUser from "../hooks/useCurrentUser";

import { Calendar, dayjsLocalizer, type View } from "react-big-calendar";
import dayjs from "dayjs";

export default function HomeView() {
    const localizer = dayjsLocalizer(dayjs);
    const today = useMemo(() => new Date(), []);

    const { authState } = useContext(FirebaseAuthContext)!;
    const { auth } = authState;

    const [isSigningOut, setIsSigningOut] = useState(false);
    const [view, setView] = useState<"home" | "admin" | "week">("home");

    const currentUser: User | null = useCurrentUser();


    // calendar event handlers

    const [calView, setCalView] = useState<View>("month");
    const onCalView = useCallback((newView: View) => setCalView(newView), [setCalView]);

    const [currDate, setCurrDate] = useState<Date>(today);
    const onNavigate = useCallback((newDate: Date) => setCurrDate(newDate), [setCurrDate]);

    const onShowMore = useCallback((_events: any[], date: Date) => {
        setCurrDate(date);
        setCalView("day");
    }, [setCurrDate, setCalView]);

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
                            selectable={true}
                            view={calView}
                            onView={onCalView}
                            defaultDate={today}
                            date={currDate}
                            onNavigate={onNavigate}
                            onShowMore={onShowMore}
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
