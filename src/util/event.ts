export type Event = {
    id: string;
    title: string;
    description: string;
    location: string;
    color: string; // length === 6, as hex string
    start: Date;
    end: Date;
    allDay: boolean; // if true, ignore granular time
    organizer: string; // user id
    invitees: Array<string>; // user ids
};
