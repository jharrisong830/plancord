import { useState, useEffect } from "react";
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CircularProgress } from "@mui/material";
import HomeView from "./ui/HomeView";
import RegisterView from "./ui/RegisterView";
import { BrowserRouter, Route, Routes } from "react-router";
import setupAuth from "./firebase/auth";

import AuthRoute from "./ui/redirects/AuthRoute";
import FirebaseAuthContext, {
    emptyFirebaseAuthContextValues
} from "./contexts/FirebaseAuthContext";

function App() {
    const [authState, setAuthState] = useState(
        emptyFirebaseAuthContextValues()
    );

    useEffect(() => {
        const asyncWrapper = async () => {
            await setupAuth(setAuthState);
        };

        asyncWrapper();
    }, []);

    return (
        <FirebaseAuthContext.Provider value={{ authState, setAuthState }}>
            {authState.auth ? (
                <BrowserRouter>
                    <Routes>
                        <Route
                            index
                            element={
                                <AuthRoute>
                                    <HomeView />
                                </AuthRoute>
                            }
                        />
                        <Route path="/register" element={<RegisterView />} />
                    </Routes>
                </BrowserRouter>
            ) : (
                <CircularProgress />
            )}
        </FirebaseAuthContext.Provider>
    );
}

export default App;
