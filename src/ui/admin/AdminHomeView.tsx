import { Button, CircularProgress } from "@mui/material";
import UserTable from "../UserTable";
import useCurrentUser from "../../hooks/useCurrentUser";

export default function AdminHomeView({ goBack }: { goBack: () => void }) {
    const currentUser = useCurrentUser();

    if (currentUser) {
        return (
            <>
                {currentUser && (
                    <>
                    <h1>Admin Panel</h1>
                    <h5>@{currentUser.userName}</h5>
                    <Button onClick={goBack}>Go Back</Button>
                    <UserTable />
                    </>
                )}
                
            </>
        );
    }
    return <CircularProgress />;
}