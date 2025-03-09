import { useState, useEffect } from "react";
import "./App.css";
import WeekView from "./ui/calendar/WeekView";
import { getStartOfCurrentWeek } from "./util/date";
import LoginView from "./ui/LoginView";
import { BrowserRouter, Route, Routes } from "react-router";
import setupAuth from "./firebase/auth";
import { type Auth } from "firebase/auth";

import AuthRoute from "./ui/redirects/AuthRoute";
import UnauthRoute from "./ui/redirects/UnauthRoute";
import FirebaseAuthContext from "./contexts/FirebaseAuthContext";

function App() {
    const today = new Date();
    const startOfWeek = getStartOfCurrentWeek(today);

    const [auth, setAuth] = useState<Auth | null>(null);
    const [authLoaded, setAuthLoaded] = useState(false);

    useEffect(() => {
        const asyncWrapper = async () => {
            const authObj = await setupAuth();
            setAuth(authObj);
            setAuthLoaded(true);
        };

        asyncWrapper();
    }, []);

    return (
        <FirebaseAuthContext.Provider value={auth}>
            {authLoaded && (
                <BrowserRouter>
                    <Routes>
                        <Route
                            index
                            element={
                                <AuthRoute>
                                    <WeekView
                                        startDate={startOfWeek}
                                        today={today}
                                    />
                                </AuthRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <UnauthRoute>
                                    <LoginView />
                                </UnauthRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            )}
        </FirebaseAuthContext.Provider>
    );
}

export default App;
