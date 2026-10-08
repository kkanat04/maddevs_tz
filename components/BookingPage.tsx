"use client";

import { useEffect, useState } from "react";
import BookingList from "@/features/bookings/components/BookingList";
import BookingModal from "@/features/bookings/components/BookingModal";
import { useAppDispatch } from "@/store/hooks";
import { getTodayDate } from "@/utils/dateUtils";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Booking } from "@/features/bookings/types";
import {
    addBooking,
    setError,
    updateBooking as updateBookingInStore,
} from "@/features/bookings/bookingsSlice";
import { createBooking, updateBooking } from "@/features/bookings/bookingsApi";

export default function BookingPage() {
    const dispatch = useAppDispatch();
    const [refreshKey, setRefreshKey] = useState(0);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    });

    const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitBooking = async (data: {
        date: string;
        start: string;
        end: string;
        title?: string;
    }) => {
        setIsSubmitting(true);
        dispatch(setError(null));

        try {
            if (editingBooking) {
                const updatedBooking = await updateBooking({
                    id: editingBooking.id,
                    ...data,
                });

                dispatch(updateBookingInStore(updatedBooking));
            } else {
                const newBooking = await createBooking(data);

                dispatch(addBooking(newBooking));
            }

            setEditingBooking(null);
            setIsModalOpen(false);
        } catch (error) {
            if (
                error instanceof Error &&
                error.message === "BOOKING_CONFLICT"
            ) {
                dispatch(setError("This time is already booked."));
                setRefreshKey((value) => value + 1);
                return;
            }

            dispatch(setError("Failed to save booking"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-neutral-50">
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
                <header className="mb-8">
                    <p className="mb-2 text-sm font-medium text-neutral-500">
                        Workspace
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
                                Meeting Room
                            </h1>

                            <p className="mt-1 text-sm text-neutral-500">
                                Manage your meeting room bookings.
                            </p>
                        </div>

                        <Button onClick={() => setIsModalOpen(true)}>
                            + Create booking
                        </Button>
                    </div>
                </header>

                <section className="mb-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                    <Input
                        id="booking-date"
                        label="Select date"
                        type="date"
                        value={selectedDate}
                        min={getTodayDate()}
                        onChange={(event) =>
                            setSelectedDate(event.target.value)
                        }
                        className="sm:max-w-xs"
                    />
                </section>

                <section className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
                    <div className="mb-5">
                        <h2 className="text-lg font-semibold text-neutral-950">
                            Bookings
                        </h2>

                        <p className="mt-1 text-sm text-neutral-500">
                            Scheduled meetings for the selected day.
                        </p>
                    </div>

                    <BookingList
                        date={selectedDate}
                        refreshKey={refreshKey}
                        onEdit={(booking) => {
                            setEditingBooking(booking);
                            setIsModalOpen(true);
                        }}
                    />
                </section>
            </div>

            <BookingModal
                isSubmitting={isSubmitting}
                isOpen={isModalOpen}
                date={selectedDate}
                booking={editingBooking}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingBooking(null);
                }}
                onSubmit={handleSubmitBooking}
            />
        </main>
    );
}
