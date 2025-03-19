import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import { Button, Container, TextField, Stack } from "@mui/material";

import FirebaseAuthContext from "../contexts/FirebaseAuthContext";
import { registerUser } from "../util/user";

export default function RegisterView() {
    const navigate = useNavigate();

    const { authState } = useContext(FirebaseAuthContext)!;
    const { auth } = authState;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [regId, setRegId] = useState("");

    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        const asyncWrapper = async () => {
            if (auth) {
                try {
                    console.log("trying to log in!");
                    await registerUser(auth, email, password, regId);
                    console.log("USER REGISTERED AND SIGNED IN");
                    navigate("/");
                } catch (e) {
                    console.log("Error in signing in user: ", e);
                }
            }
        };

        if (isLoggingIn) {
            asyncWrapper();
        }
    }, [isLoggingIn, auth, email, password, regId]);

    return (
        <Container>
            <h1>Plancord</h1>
            <h3>Pcord Scheduling Calendar</h3>
            <h5>
                Register your account with the given email address and
                registration ID. Create a password and remember it!{" "}
                <a onClick={() => navigate("/")}>Need to log in?</a>
            </h5>
            <Stack spacing={1}>
                <TextField
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    label="Create a assword"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                    label="Registration ID"
                    onChange={(e) => setRegId(e.target.value)}
                />
                <Button
                    variant="contained"
                    disabled={
                        email.trim().length === 0 ||
                        password.trim().length === 0 ||
                        regId.trim().length === 0
                    }
                    onClick={() => setIsLoggingIn(true)}
                >
                    Register
                </Button>
            </Stack>
        </Container>
    );
}
