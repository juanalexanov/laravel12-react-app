export interface SpeakerApplication {
    id: number;
    status: "pending" | "approved" | "rejected";
    remarks: string | null;
    applicationDate: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}
