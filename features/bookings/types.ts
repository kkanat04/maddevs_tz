export type Booking = {
    id: string;
    date: string;
    start: string;
    end: string;
    title?: string;
};

export type CreateBookingData = {
    date: string;
    start: string;
    end: string;
    title?: string;
};

export type UpdateBookingData = {
    id: string;
    date: string;
    start: string;
    end: string;
    title?: string;
};
