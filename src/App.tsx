import "./App.css";
import WeekView from "./ui/calendar/WeekView";
import { getStartOfCurrentWeek } from "./util/date";

function App() {
    const today = new Date();
    const startOfWeek = getStartOfCurrentWeek(today);

    return (
        <>
            <WeekView startDate={startOfWeek} />
        </>
    );
}

export default App;
