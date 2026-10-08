import { NextRequest, NextResponse } from "next/server";
import { Booking } from "@/features/bookings/types";
import {
    hasBookingConflict,
    validateBookingTime,
} from "@/features/bookings/validation";
import { bookings } from "./store";

export const GET = async (request: NextRequest) => {
    const date = request.nextUrl.searchParams.get("date");

    if (!date) {
        return NextResponse.json(
            { message: "Date is required" },
            { status: 400 },
        );
    }

    const dateBookings = bookings.filter((booking) => booking.date === date);

    return NextResponse.json(dateBookings);
}

export const POST = async (request: NextRequest) => {
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

    if (hasBookingConflict(dateBookings, start, end)) {
        return NextResponse.json(
            { message: "This time is already booked" },
            { status: 409 },
        );
    }

    const newBooking: Booking = {
        id: crypto.randomUUID(),
        date,
        start,
        end,
        title,
    };

    bookings.push(newBooking);

    return NextResponse.json(newBooking, { status: 201 });
};
