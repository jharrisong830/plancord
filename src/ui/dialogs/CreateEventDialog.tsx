import { useState, useEffect, useCallback } from "react";
import {
    Dialog,
    DialogTitle,
    Button,
    DialogContent,
    DialogActions,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Stack
} from "@mui/material";
import { createEvent } from "../../util/event";
import { type User } from "../../util/user";
import useCurrentUser from "../../hooks/useCurrentUser";

export default function CreateEventDialog({
    isDialogOpen,
    setIsDialogOpen
}: {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
}) {
    const currentUser: User | null = useCurrentUser();

    const handleCloseDialog = useCallback(
        () => setIsDialogOpen(false),
        [setIsDialogOpen]
    );

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [color, setColor] = useState("000000"); // default to black
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [allDay, setAllDay] = useState(false);
    const [invitees, setInvitees] = useState<Array<string>>([]); // array of user IDs

    const [isUpdating, setIsUpdating] = useState(false);

    // effect for creating a user (triggered after click of save button)
    useEffect(() => {
        const asyncWrapper = async () => {
            if (currentUser) {
                try {
                    const newEvent = await createEvent(
                        title,
                        description,
                        location,
                        color,
                        start,
                        end,
                        allDay,
                        currentUser.regId,
                        invitees
                    );
                    console.log("EVENT CREATED: ", newEvent);
                } catch (e) {
                    console.log("Error in creating event: ", e);
                }
            }

            handleCloseDialog(); // close once done
        };

        if (isUpdating) {
            asyncWrapper();
        }
    }, [
        isUpdating,
        title,
        description,
        location,
        color,
        start,
        end,
        allDay,
        invitees,
        currentUser,
        handleCloseDialog
    ]);

    return (
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle>Create Event</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <Stack spacing={1}>
                        <TextField
                            label="Title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            label="Description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <TextField
                            label="Location"
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <TextField
                            label="Color (hex)"
                            onChange={(e) => setColor(e.target.value)}
                        />
                        <TextField
                            type="datetime-local"
                            label="Start"
                            onChange={(e) => setStart(new Date(e.target.value))}
                        />
                        <TextField
                            type="datetime-local"
                            label="End"
                            onChange={(e) => setEnd(new Date(e.target.value))}
                        />
                        <FormControlLabel
                            label="All Day?"
                            control={
                                <Checkbox
                                    onChange={(e) =>
                                        setAllDay(e.target.checked)
                                    }
                                />
                            }
                        />
                    </Stack>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleCloseDialog}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setIsUpdating(true)}
                    disabled={
                        isUpdating ||
                        title.trim() === "" ||
                        description.trim() === "" ||
                        location.trim() === "" ||
                        color.trim() === ""
                    }
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
