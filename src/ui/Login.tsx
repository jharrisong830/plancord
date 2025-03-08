import { useState, useEffect } from "react";

import app from "../firebase/configuration";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Box, Button, Container, TextField, Stack } from "@mui/material";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        if (isLoggingIn) {
            const auth = getAuth(app);
            console.log("We connected!");
        }
    }, [isLoggingIn]);

    return (
        <Container>
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
