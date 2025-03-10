import { Grid2 as Grid } from "@mui/material";

import { range } from "../../util/date";

export default function DaySchedule() {
    const hours = range(0, 24);

    return (
        <>
            {hours.map((hour) => (
                <Grid container key={hour}>
                    <Grid
                        sx={{
                            height: "50px",
                            width: "100%",
                            border: "1px solid black"
                        }}
                    >
                        {hour}:00
                    </Grid>
                </Grid>
            ))}
        </>
    );
}
