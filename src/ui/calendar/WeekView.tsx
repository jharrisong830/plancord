import { Box, Container, Grid2 as Grid, Stack } from "@mui/material";

import { timestampToStringISO, getWeekday, range, MS_IN_DAY } from "../../util/date";
import DaySchedule from "./DaySchedule";

export default function WeekView({
    startDate,
    today
}: {
    startDate: Date;
    today: Date;
}) {
    const days = range(0, 7).map(
        (i) => new Date(startDate.getTime() + i * MS_IN_DAY)
    );

    return (

            <Container maxWidth={false}>
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
