import { Booking, CreateBookingData, UpdateBookingData } from "./types";

const API_URL = "/api/bookings";

export const getBookings = async (date: string) => {
    const response = await fetch(`${API_URL}?date=${date}`);

    if (!response.ok) {
        throw new Error("Failed to load bookings");
    }

    return response.json();
};

export const createBooking = async (data: CreateBookingData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.status === 409) {
        throw new Error("BOOKING_CONFLICT");
    }

    if (!response.ok) {
        throw new Error("Failed to create booking");
    }

    return response.json();
};

export const updateBooking = async (data: UpdateBookingData) => {
    const { id, ...bookingData } = data;

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
    });

    if (response.status === 409) {
        throw new Error("BOOKING_CONFLICT");
    }

    if (!response.ok) {
        throw new Error("Failed to update booking");
    }

    return response.json();
};

export const deleteBooking = async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete booking");
    }
};
