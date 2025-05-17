export interface Payment {
    id: number;
    amount: number;
    paymentDate: string;
    paymentMethod: string;
    user: {
        id: number;
        name: string;
    };
    seminar: {
        id: number;
        title: string;
    };
}
