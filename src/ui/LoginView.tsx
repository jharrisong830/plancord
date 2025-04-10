import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import { Button, Container, TextField, Stack } from "@mui/material";

import FirebaseAuthContext from "../contexts/FirebaseAuthContext";
import { signInUser } from "../util/user";

export default function LoginView() {
    const navigate = useNavigate();

    const { setToken } = useContext(FirebaseAuthContext)!;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        const asyncWrapper = async () => {
                try {
                    const idToken = await signInUser(email, password);
                    setToken(idToken);
                    console.log("USER SIGNED IN");
                } catch (e) {
                    console.log("Error in signing in user: ", e);
                }
        };

        if (isLoggingIn) {
            asyncWrapper();
        }
    }, [isLoggingIn, setToken, email, password]);

    return (
        <Container>
            <h1>Plancord</h1>
            <h3>Pcord Scheduling Calendar</h3>
            <h5>
                Log in with your email and password.{" "}
                <a onClick={() => navigate("/register")}>
                    Need to create an account?
                </a>
            </h5>
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
