import "./App.css";
// import WeekView from "./ui/calendar/WeekView";
import Login from "./ui/Login";
// import { getStartOfCurrentWeek } from "./util/date";

function App() {
    const today = new Date();
    // const startOfWeek = getStartOfCurrentWeek(today);

    return (
        <>
            {/* <WeekView startDate={startOfWeek} today={today} /> */}
            <Login />
        </>
    );
}

export default App;
