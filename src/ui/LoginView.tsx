import { useState, useEffect, useContext } from "react";

import { Button, Container, TextField, Stack } from "@mui/material";

import FirebaseAuthContext from "../contexts/FirebaseAuthContext";
import { signInUser } from "../util/user";

export default function LoginView() {
    const { authState } = useContext(FirebaseAuthContext)!;
    const { auth } = authState;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        const asyncWrapper = async () => {
            if (auth) {
                try {
                    await signInUser(auth, email, password);
                    console.log("USER SIGNED IN");
                } catch (e) {
                    console.log("Error in signing in user: ", e);
                }
            }
        };

        if (isLoggingIn) {
            asyncWrapper();
            setIsLoggingIn(false);
        }
    }, [isLoggingIn]);

    return (
        <Container>
            <h1>Plancord</h1>
            <h3>Pcord Scheduling Calendar</h3>
            <Stack spacing={1}>
                <TextField
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    disabled={
                        email.trim().length === 0 ||
                        password.trim().length === 0
                    }
                    onClick={() => setIsLoggingIn(true)}
                >
                    Log in
                </Button>
            </Stack>
        </Container>
    );
}
