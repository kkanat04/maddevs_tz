import { NextRequest, NextResponse } from "next/server";
import {
    hasBookingConflict,
    validateBookingTime,
} from "@/features/bookings/validation";
import { bookings } from "../store";

type RouteContext = {
    params: Promise<{ id: string }>;
};

export const PATCH = async (request: NextRequest, { params }: RouteContext) => {
    const { id } = await params;

    const bookingIndex = bookings.findIndex((booking) => booking.id === id);

    if (bookingIndex === -1) {
        return NextResponse.json(
            { message: "Booking not found" },
            { status: 404 },
        );
    }

    const body = await request.json();

    const { date, start, end, title } = body;

    if (!date || !start || !end) {
        return NextResponse.json(
            { message: "Date, start and end are required" },
            { status: 400 },
        );
    }

    const timeValidation = validateBookingTime(start, end);

    if (!timeValidation.valid) {
        return NextResponse.json(
            { message: timeValidation.error },
            { status: 400 },
        );
    }

    const dateBookings = bookings.filter((booking) => booking.date === date);

    if (hasBookingConflict(dateBookings, start, end, id)) {
        return NextResponse.json(
            { message: "This time is already booked" },
            { status: 409 },
        );
    }

    const updatedBooking = {
        ...bookings[bookingIndex],
        date,
        start,
        end,
        title,
    };

    bookings[bookingIndex] = updatedBooking;

    return NextResponse.json(updatedBooking);
};

export const DELETE = async (
    request: NextRequest,
    { params }: RouteContext,
) => {
    const { id } = await params;

    const bookingIndex = bookings.findIndex((booking) => booking.id === id);

    if (bookingIndex === -1) {
        return NextResponse.json(
            { message: "Booking not found" },
            { status: 404 },
        );
    }

    bookings.splice(bookingIndex, 1);

    return new NextResponse(null, { status: 204 });
};
