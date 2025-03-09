import { Dialog, DialogTitle, Button, DialogContent, DialogActions } from "@mui/material";
import { type User } from "../util/user";

/** modal to edit (or create a user)
 * userId === null => create a new user
 */
export default function EditUserDialog({ user, setUser, isDialogOpen, setIsDialogOpen }: { user: User | null, setUser: (user: User | null) => void, isDialogOpen: boolean, setIsDialogOpen: (isOpen: boolean) => void }) {
    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setUser(null);
    }
    
    return (
        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                Hello! Your user id is {user?.id} and the user is {user?.userName}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={handleCloseDialog}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleCloseDialog}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}