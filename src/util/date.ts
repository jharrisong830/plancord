/**
 * functions for date formatting and processing
 */

/**
 * constants
 */

export const MS_IN_DAY = 1000 * 60 * 60 * 24;
const DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/**
 * returns current time in unix epoch milliseconds
 * @returns {number} milliseconds since 01 January 1970 00:00
 */
export const getCurrentEpoch = (): number => Date.now();

/**
 * returns the number of days in a given month, accounting for leap years
 * @param monthInd 0-index of month
 * @param year used for leap year
 * @returns {number} days in month
 * @throws if month is not in [0, 11] (inclusive)
 */
export const getDaysInMonth = (monthInd: number, year: number): number => {
    switch (monthInd) {
        case 1:
            return year % 4 === 0 ? 29 : 28;
        case 3:
        case 5:
        case 8:
        case 10:
            return 30;
        case 0:
        case 2:
        case 4:
        case 6:
        case 7:
        case 9:
        case 11:
            return 31;
        default:
            throw `ERROR: ${monthInd} is not a valid month index in [0, 11]`;
    }
};

/**
 * returns a timestamp for start of the current week (the most recently passed sunday)
 * @param date 
 */
export const getStartOfCurrentWeek = (date: Date): Date => {
    return new Date(date.getTime() - (date.getDay() * MS_IN_DAY));
};

/**
 * returns a string for the day of the week
 * @param date 
 */
export const getWeekday = (date: Date): string => DAYS_OF_WEEK[date.getDay()];

/**
 * converts a timestamp to a date string in ISO format
 * @param timestamp
 * @returns {string} yyyy-mm-dd
 */
export const timestampToStringISO = (timestamp: number): string => {
    const date = new Date(timestamp);
    const [day, monthInd, year] = [
        date.getDate(),
        date.getMonth(),
        date.getFullYear()
    ];
    return `${year}-${(monthInd + 1).toString().length === 1 ? "0" : ""}${monthInd + 1}-${day.toString().length === 1 ? "0" : ""}${day}`;
};
