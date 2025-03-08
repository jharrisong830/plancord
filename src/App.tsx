import "./App.css";
import WeekView from "./ui/calendar/WeekView";
import { getStartOfCurrentWeek } from "./util/date";
import LoginView from "./ui/LoginView";
import { BrowserRouter, Route, Routes } from "react-router";

import AuthRoute from "./ui/redirects/AuthRoute";
import UnauthRoute from "./ui/redirects/UnauthRoute";

function App() {
    const today = new Date();
    const startOfWeek = getStartOfCurrentWeek(today);

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    index
                    element={
                        <AuthRoute>
                            <WeekView startDate={startOfWeek} today={today} />
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
    );
}

export default App;
