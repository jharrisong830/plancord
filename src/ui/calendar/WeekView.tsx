import { timestampToStringISO, getWeekday, MS_IN_DAY } from "../../util/date";

export default function WeekView({ startDate, today }: { startDate: Date, today: Date }) {
    const days = [0, 1, 2, 3, 4, 5, 6].map((i) => new Date(startDate.getTime() + i * MS_IN_DAY));

    return (
        <div>
            {days.map((day, ind) => (
                <div key={ind}>{timestampToStringISO(day.getTime())} ({getWeekday(day)}){today.getDay() === ind ? " TODAY" : ""}</div>
            ))}
        </div>
    );
}
