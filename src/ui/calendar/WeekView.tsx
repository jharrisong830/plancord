import { timestampToStringISO, MS_IN_DAY } from "../../util/date";

export default function WeekView({ startDate }: { startDate: number }) {
    const days = [0, 1, 2, 3, 4, 5, 6].map((i) => startDate + i * MS_IN_DAY);

    return (
        <div>
            {days.map((day) => (
                <div key={day}>{timestampToStringISO(day)}</div>
            ))}
        </div>
    );
}
