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
    CircularProgress
} from "@mui/material";
import { updateUser, type User } from "../../util/user";

/** modal to edit an existing user
 */
export default function EditUserDialog({
    user,
    setUser,
    isDialogOpen,
    setIsDialogOpen
}: {
    user: User | null;
    setUser: (user: User | null) => void;
    isDialogOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
}) {
    const handleCloseDialog = useCallback(() => {
        setIsDialogOpen(false);
        setUser(null);
    }, [setIsDialogOpen, setUser]);

    const [isUpdating, setIsUpdating] = useState(false);

    // effect for updating a user (triggered after click of save button)
    useEffect(() => {
        const asyncWrapper = async () => {
            try {
                await updateUser(user!);
                console.log("USER UPDATED");
            } catch (e) {
                console.log("Error in updating user: ", e);
            }
            handleCloseDialog(); // close once done
        };

        // TODO: password update with firebase auth

        if (isUpdating) {
            asyncWrapper();
        }
    }, [isUpdating, user, handleCloseDialog]);

    return (
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            {user === null ? (
                <CircularProgress />
            ) : (
                <>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogContent>
                        <FormGroup>
                            <Stack spacing={1}>
                                <TextField
                                    label="Email"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            email: e.target.value
                                        })
                                    }
                                    defaultValue={user.email}
                                />
                                <TextField
                                    label="Username"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            userName: e.target.value
                                        })
                                    }
                                    defaultValue={user.userName}
                                />
                                <TextField
                                    label="Display Name"
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            displayName: e.target.value
                                        })
                                    }
                                    defaultValue={user.displayName}
                                />
                                <FormControlLabel
                                    label="Administrator"
                                    control={
                                        <Checkbox
                                            onChange={(e) =>
                                                setUser({
                                                    ...user,
                                                    admin: e.target.checked
                                                })
                                            }
                                            checked={user.admin}
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
                                user.userName.trim() === "" ||
                                user.email.trim() === "" ||
                                user.displayName.trim() === ""
                            }
                        >
                            Save
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}
