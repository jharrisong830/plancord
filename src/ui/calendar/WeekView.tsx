import { timestampToStringISO, getWeekday, MS_IN_DAY } from "../../util/date";

export default function WeekView({ startDate }: { startDate: Date }) {
    const days = [0, 1, 2, 3, 4, 5, 6].map((i) => new Date(startDate.getTime() + i * MS_IN_DAY));

    return (
        <div>
            {days.map((day) => (
                <div key={day.getTime()}>{timestampToStringISO(day.getTime())} ({getWeekday(day)})</div>
            ))}
        </div>
    );
}
