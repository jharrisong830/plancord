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
import { createUser } from "../../util/user";

/** modal to edit an existing user
 */
export default function CreateUserDialog({
    isDialogOpen,
    setIsDialogOpen,
    refreshUsers
}: {
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
    refreshUsers: () => void;
}) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [admin, setAdmin] = useState(false);

    const [isUpdating, setIsUpdating] = useState(false);

    const handleCloseDialog = useCallback(() => {
        // clear old values
        setIsUpdating(false);
        setUserName("");
        setEmail("");
        setDisplayName("");
        setAdmin(false);

        setIsDialogOpen(false);
        refreshUsers();
    }, [setIsDialogOpen, refreshUsers]);

    // effect for creating a user (triggered after click of save button)
    useEffect(() => {
        const asyncWrapper = async () => {
            try {
                const newUser = await createUser(
                    userName,
                    email,
                    displayName,
                    admin
                );
                console.log("USER CREATED: ", newUser);
            } catch (e) {
                console.log("Error in updating user: ", e);
            }
            handleCloseDialog(); // close once done
        };

        if (isUpdating) {
            asyncWrapper();
        }
    }, [isUpdating, userName, email, displayName, admin, handleCloseDialog]);

    return (
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle>Create User</DialogTitle>
            <DialogContent>
                <FormGroup>
                    <Stack spacing={1}>
                        <TextField
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Username"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <TextField
                            label="Display Name"
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                        <FormControlLabel
                            label="Administrator"
                            control={
                                <Checkbox
                                    onChange={(e) => setAdmin(e.target.checked)}
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
                        userName.trim() === "" ||
                        email.trim() === "" ||
                        displayName.trim() === ""
                    }
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
