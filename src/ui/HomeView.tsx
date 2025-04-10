import { useState, useEffect, useContext, useCallback, useMemo } from "react";
import FirebaseAuthContext from "../contexts/FirebaseAuthContext";
// import { type Event, getCurrentUserEvents } from "../util/event";
// import AdminHomeView from "./admin/AdminHomeView";
import { Button, CircularProgress } from "@mui/material";
// import useCurrentUser from "../hooks/useCurrentUser";
// import CreateEventDialog from "./dialogs/CreateEventDialog";

import {
    Calendar,
    dayjsLocalizer,
    type View,
    type Event as CalEvent,
    type SlotInfo
} from "react-big-calendar";
import dayjs from "dayjs";

export default function HomeView() {
    const localizer = dayjsLocalizer(dayjs);
    const today = useMemo(() => new Date(), []);

    const { token, setToken } = useContext(FirebaseAuthContext)!;

    const signOutUser = useCallback(() => {
        setToken(null);
    }, [setToken]);

    const [view, setView] = useState<"home" | "admin" | "week">("home");

    // const { currentUser } = useCurrentUser();

    // create event dialog
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleOpenDialog = useCallback(
        () => setIsDialogOpen(true),
        [setIsDialogOpen]
    );

    // calendar event handlers

    const [calView, setCalView] = useState<View>("month");
    const onCalView = useCallback(
        (newView: View) => setCalView(newView),
        [setCalView]
    );

    const [currDate, setCurrDate] = useState<Date>(today);
    const onNavigate = useCallback(
        (newDate: Date) => setCurrDate(newDate),
        [setCurrDate]
    );

    const onShowMore = useCallback(
        (_events: Array<CalEvent>, date: Date) => {
            setCurrDate(date);
            setCalView("day");
        },
        [setCurrDate, setCalView]
    );

    const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);
    const onSelectSlot = useCallback(
        (selection: SlotInfo) => {
            setSelectedSlot(selection);
            handleOpenDialog();
        },
        [handleOpenDialog]
    );

    // effect for loading events
    const [events, setEvents] = useState<Array<Event | CalEvent>>([]);
    useEffect(() => {
        const asyncWrapper = async () => {
            if (false) {
                try {
                    // const evs = await getCurrentUserEvents(currentUser.regId);
                    // setEvents(evs);
                } catch (e) {
                    console.log("Error in fetching events: ", e);
                }
            }
        };

        asyncWrapper();
    }, []);

    switch (view) {
        case "home":
            if (token) {
                return (
                    <>
                        <h1>Home</h1>
                        <Button onClick={() => signOutUser()}>
                            Sign Out
                        </Button>
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
                            onSelectSlot={onSelectSlot}
                            style={{ height: 500 }}
                        />
                        {/* <CreateEventDialog
                            isDialogOpen={isDialogOpen}
                            setIsDialogOpen={setIsDialogOpen}
                            selectedSlot={selectedSlot}
                            setSelectedSlot={setSelectedSlot}
                            allDayDefault={calView === "month"}
                        /> */}
                    </>
                );
            }
            return <CircularProgress />;
        // case "admin":
        //     return <AdminHomeView goBack={() => setView("home")} />;
        default:
            return <CircularProgress />;
    }
}
