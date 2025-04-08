import firestore from "../firebase/firestore";
import { setDoc, getDoc, doc, getDocs, collection, type Timestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";

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

type FirestoreEvent = Event & {
    start: Timestamp;
    end: Timestamp;
}

export const createEvent = async (
    title: string,
    description: string,
    location: string,
    color: string,
    start: Date,
    end: Date,
    allDay: boolean,
    organizer: string,
    invitees: Array<string>
): Promise<Event> => {
    const db = firestore();
    try {
        const newEvent: Event = {
            id: uuid(),
            title: title.trim(),
            description: description.trim(),
            location: location.trim(),
            color: color.trim(),
            start,
            end,
            allDay,
            organizer,
            invitees
        };

        await setDoc(doc(db, "events", newEvent.id), newEvent);
        console.log("Event document written with ID: ", newEvent.id);
        return newEvent;
    } catch (e) {
        console.log("Error in creating new event: ", e);
        throw e;
    }
};

export const getEvent = async (eventId: string): Promise<Event> => {
    const db = firestore();
    try {
        const docRef = doc(db, "events", eventId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as Event;
        }
        throw new Error(`No such event with ID ${eventId}`);
    } catch (e) {
        console.log("Error in fetching event: ", e);
        throw e;
    }
};

export const getAllEvents = async (): Promise<Array<Event>> => {
    const db = firestore();
    try {
        const querySnapshot = await getDocs(collection(db, "events"));
        const events = querySnapshot.docs.map((d) => d.data() as FirestoreEvent);
        return events.map((e) => ({ ...e, start: e.start.toDate(), end: e.end.toDate() })) as Array<Event>;
    } catch (e) {
        console.log("Error in getting all events: ", e);
        throw e;
    }
};
