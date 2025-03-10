import { useState } from "react";
import { CircularProgress, Button } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { type User } from "../util/user";
import useAllUsers from "../hooks/useAllUsers";
import EditUserDialog from "./dialogs/EditUserDialog";

export default function UserTable() {
    const allUsers = useAllUsers();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    const handleOpenDialog = (user: User) => {
        setUser(user);
        setIsDialogOpen(true);
    };

    const columns: Array<GridColDef> = [
        { field: "userName", headerName: "Username", flex: 2 },
        { field: "email", headerName: "Email", flex: 2 },
        { field: "displayName", headerName: "Display Name", flex: 1 },
        { field: "admin", headerName: "Admin", type: "boolean" },
        {
            field: "options",
            headerName: "Options",
            flex: 1,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(params.row)}
                >
                    Edit
                </Button>
            )
        }
    ];

    if (!allUsers) {
        return <CircularProgress />;
    }

    return (
        <>
            <DataGrid columns={columns} rows={allUsers} />
            <EditUserDialog
                user={user}
                setUser={setUser}
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />
        </>
    );
}
