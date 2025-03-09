import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import FirebaseAuthContext from "../../contexts/FirebaseAuthContext";
import { signOutUser } from "../../util/user";

import { Box, Container, Grid2 as Grid, Stack, Button } from "@mui/material";

import {
    timestampToStringISO,
    getWeekday,
    range,
    MS_IN_DAY
} from "../../util/date";
import DaySchedule from "./DaySchedule";

export default function WeekView({
    startDate,
    today
}: {
    startDate: Date;
    today: Date;
}) {
    const navigate = useNavigate();

    const auth = useContext(FirebaseAuthContext);
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
            navigate("/login");
        }
    }, [isSigningOut]);

    const days = range(0, 7).map(
        (i) => new Date(startDate.getTime() + i * MS_IN_DAY)
    );

    return (
        <Container maxWidth={false}>
            <Button onClick={() => setIsSigningOut(true)}>Sign Out</Button>
            <Grid container columns={14}>
                {days.map((day, ind) => (
                    <Grid key={ind} size={2}>
                        <Stack spacing={1}>
                            <Box>
                                {timestampToStringISO(day.getTime())} (
                                {getWeekday(day)})
                                {today.getDay() === ind ? " TODAY" : ""}
                            </Box>
                            <Box>
                                <DaySchedule />
                            </Box>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
