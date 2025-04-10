import { useState } from "react";
import "./App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import HomeView from "./ui/HomeView";
// import RegisterView from "./ui/RegisterView";
import { BrowserRouter, Route, Routes } from "react-router";

import AuthRoute from "./ui/redirects/AuthRoute";
import FirebaseAuthContext from "./contexts/FirebaseAuthContext";

function App() {
    const [token, setToken] = useState<string | null>(null);

    return (
        <FirebaseAuthContext.Provider value={{ token, setToken }}>
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
                        {/* <Route path="/register" element={<RegisterView />} /> */}
                    </Routes>
                </BrowserRouter>
        </FirebaseAuthContext.Provider>
    );
}

export default App;
