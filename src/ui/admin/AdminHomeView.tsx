import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import UserTable from "../UserTable";
import useCurrentUser from "../../hooks/useCurrentUser";
import CreateUserDialog from "../dialogs/CreateUserDialog";

export default function AdminHomeView({ goBack }: { goBack: () => void }) {
    const currentUser = useCurrentUser();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleOpenDialog = () => setIsDialogOpen(true);

    if (currentUser) {
        return (
            <>
                {currentUser && (
                    <>
                        <h1>Admin Panel</h1>
                        <h5>@{currentUser.userName}</h5>
                        <Button onClick={goBack}>Go Back</Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleOpenDialog}
                        >
                            Create User
                        </Button>
                        <UserTable />
                    </>
                )}
                <CreateUserDialog
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                />
            </>
        );
    }
    return <CircularProgress />;
}
