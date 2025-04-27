export type Seminar = {
    id: number;
    title: string;
    description?: string | null;
    eventDate: string;
    eventTime: string;
    speaker_id?: number | null;
    price: string;
    googleMeetLink?: string | null;
    speakers?: { id: number; name: string }[];
};
