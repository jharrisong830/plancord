import { CircularProgress } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { type User } from "../util/user";
import useAllUsers from "../hooks/useAllUsers";

export default function UserTable() {
    const allUsers = useAllUsers();

    const columns: Array<GridColDef> = [
        { field: "userName", headerName: "Username" },
        { field: "email", headerName: "Email" },
        { field: "displayName", headerName: "Display Name" },
        { field: "admin", headerName: "Admin", type: "boolean" }
    ];

    const rows = allUsers?.map((user: User) => ({
        id: user.id,
        userName: user.userName,
        email: user.email,
        displayName: user.displayName,
        admin: user.admin
    }));

    if (!rows) {
        return <CircularProgress />;
    }
    return <DataGrid columns={columns} rows={rows} />;
}
