import "./App.css";
import { getCurrentEpoch } from "./util/date";
import WeekView from "./ui/calendar/WeekView";

function App() {
    const today = getCurrentEpoch();
    return (
        <>
            <WeekView startDate={today} />
        </>
    );
}

export default App;
