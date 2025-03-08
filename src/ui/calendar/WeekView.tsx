import { Box, Container, Grid2 as Grid } from "@mui/material";

import { timestampToStringISO, getWeekday, MS_IN_DAY } from "../../util/date";

export default function WeekView({
    startDate,
    today
}: {
    startDate: Date;
    today: Date;
}) {
    const days = [0, 1, 2, 3, 4, 5, 6].map(
        (i) => new Date(startDate.getTime() + i * MS_IN_DAY)
    );

    return (
        <Box>
            <Container maxWidth={false}>
                <Grid container columns={14}>
                    {days.map((day, ind) => (
                        <Grid key={ind} size={2}>
                            {timestampToStringISO(day.getTime())} (
                            {getWeekday(day)})
                            {today.getDay() === ind ? " TODAY" : ""}
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
