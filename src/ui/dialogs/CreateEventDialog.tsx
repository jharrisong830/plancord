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
    Stack,
    Select,
    MenuItem,
    CircularProgress
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers";

import { createEvent } from "../../util/event";
import useCurrentUser from "../../hooks/useCurrentUser";
import useAllUsers from "../../hooks/useAllUsers";

import { type SlotInfo } from "react-big-calendar";
import dayjs from "dayjs";

export default function CreateEventDialog({
    isDialogOpen,
    setIsDialogOpen,
    selectedSlot,
    setSelectedSlot,
    allDayDefault
}: {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    selectedSlot: SlotInfo | null;
    setSelectedSlot: (slot: SlotInfo | null) => void;
    allDayDefault: boolean;
}) {
    const { currentUser } = useCurrentUser();
    const { allUsers } = useAllUsers();

    /** ensures that items already selected have bold text */
    const getSelectedStyle = (regId: string): { fontWeight?: string } => {
        if (invitees.includes(regId)) return { fontWeight: "bold" };
        return {};
    };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [color, setColor] = useState("000000"); // default to black
    const [allDay, setAllDay] = useState(allDayDefault); // depends on what view is selected (month => all day)
    const [invitees, setInvitees] = useState<Array<string>>([]); // array of user IDs

    const [isUpdating, setIsUpdating] = useState(false);

    const handleCloseDialog = useCallback(() => {
        setIsUpdating(false);
        setTitle("");
        setDescription("");
        setLocation("");
        setColor("000000");
        setAllDay(allDayDefault);
        setInvitees([]);

        setIsDialogOpen(false);
    }, [setIsDialogOpen, allDayDefault]);

    // effect for creating a user (triggered after click of save button)
    useEffect(() => {
        const asyncWrapper = async () => {
            if (currentUser && selectedSlot) {
                try {
                    const newEvent = await createEvent(
                        title,
                        description,
                        location,
                        color,
                        selectedSlot.start,
                        selectedSlot.end,
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
        selectedSlot,
        allDay,
        invitees,
        currentUser,
        handleCloseDialog
    ]);

    return (
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle>Create Event</DialogTitle>
            <DialogContent>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    {selectedSlot ? (
                        <FormGroup>
                            <Stack spacing={1}>
                                <TextField
                                    label="Title"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <TextField
                                    label="Description"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                                <TextField
                                    label="Location"
                                    onChange={(e) =>
                                        setLocation(e.target.value)
                                    }
                                />
                                <TextField
                                    label="Color (hex)"
                                    onChange={(e) => setColor(e.target.value)}
                                />
                                {/* <TextField
                                type="datetime-local"
                                label="Start"
                                onChange={(e) => setSelectedSlot({ ...selectedSlot, start: new Date(e.target.value) })}
                            />
                            <TextField
                                type="datetime-local"
                                label="End"
                                onChange={(e) => setSelectedSlot({ ...selectedSlot, end: new Date(e.target.value) })}
                            /> */}
                                <DateTimePicker
                                    label="Start"
                                    value={dayjs(selectedSlot.start)}
                                    onChange={(newVal) =>
                                        newVal &&
                                        setSelectedSlot({
                                            ...selectedSlot,
                                            start: newVal.toDate()
                                        })
                                    }
                                />
                                <DateTimePicker
                                    label="End"
                                    value={dayjs(selectedSlot.end)}
                                    onChange={(newVal) =>
                                        newVal &&
                                        setSelectedSlot({
                                            ...selectedSlot,
                                            end: newVal.toDate()
                                        })
                                    }
                                />
                                <FormControlLabel
                                    label="All Day?"
                                    control={
                                        <Checkbox
                                            defaultChecked={allDayDefault}
                                            onChange={(e) =>
                                                setAllDay(e.target.checked)
                                            }
                                        />
                                    }
                                />
                                <FormControlLabel
                                    label="Invitees"
                                    control={
                                        <Select
                                            multiple
                                            value={invitees}
                                            onChange={(e) =>
                                                setInvitees(
                                                    e.target
                                                        .value as Array<string>
                                                )
                                            }
                                        >
                                            {allUsers && currentUser
                                                ? allUsers
                                                      .filter(
                                                          (u) =>
                                                              u.regId !==
                                                              currentUser.regId
                                                      )
                                                      .map((u) => (
                                                          <MenuItem
                                                              value={u.regId}
                                                              style={getSelectedStyle(
                                                                  u.regId
                                                              )}
                                                          >
                                                              {u.displayName}
                                                          </MenuItem>
                                                      ))
                                                : []}
                                        </Select>
                                    }
                                />
                            </Stack>
                        </FormGroup>
                    ) : (
                        <CircularProgress />
                    )}
                </LocalizationProvider>
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
