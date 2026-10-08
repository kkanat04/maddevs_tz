"use client";

import { useEffect } from "react";
import { getBookings } from "@/features/bookings/bookingsApi";
import {
    setBookings,
    setError,
    setLoading,
} from "@/features/bookings/bookingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import BookingItem from "./BookingItem";
import { deleteBooking } from "@/features/bookings/bookingsApi";
import { removeBooking } from "@/features/bookings/bookingsSlice";
import { Booking } from "../types";

type BookingListProps = {
    date: string;
    onEdit: (booking: Booking) => void;
    refreshKey: number;
};

export default function BookingList({
    date,
    onEdit,
    refreshKey,
}: BookingListProps) {
    const dispatch = useAppDispatch();

    const { bookings, loading, error } = useAppSelector(
        (state) => state.bookings,
    );

    useEffect(() => {
        if (!date) return;

        async function loadBookings() {
            dispatch(setLoading(true));
            dispatch(setError(null));

            try {
                const data = await getBookings(date);
                dispatch(setBookings(data));
            } catch {
                dispatch(setError("Failed to load bookings"));
            } finally {
                dispatch(setLoading(false));
            }
        }

        loadBookings();
    }, [date, refreshKey, dispatch]);

    if (loading) {
        return (
            <div className="space-y-3">
                <div className="h-16 animate-pulse rounded-xl bg-neutral-100" />
                <div className="h-16 animate-pulse rounded-xl bg-neutral-100" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
                {error}
            </div>
        );
    }

    if (bookings.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-neutral-200 py-12 text-center">
                <p className="text-sm font-medium text-neutral-700">
                    No bookings
                </p>

                <p className="mt-1 text-sm text-neutral-400">
                    There are no meetings scheduled for this day.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {bookings.map((booking) => (
                <BookingItem
                    key={booking.id}
                    booking={booking}
                    onEdit={onEdit}
                    onDelete={async (id) => {
                        try {
                            await deleteBooking(id);

                            dispatch(removeBooking(id));
                        } catch {
                            dispatch(setError("Failed to delete booking"));
                        }
                    }}
                />
            ))}
        </div>
    );
}
