"use client";

import { FormEvent, useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Booking } from "../types";
import {
    isPastTime,
    validateBookingTime,
} from "@/features/bookings/validation";

type BookingFormProps = {
    date: string;
    booking?: Booking | null;
    isSubmitting: boolean;
    onSubmit: (data: {
        date: string;
        start: string;
        end: string;
        title?: string;
    }) => void;
    onClose: () => void;
};

export default function BookingForm({
    date,
    booking,
    onSubmit,
    onClose,
    isSubmitting,
}: BookingFormProps) {
    const [start, setStart] = useState(booking?.start ?? "09:00");

    const [end, setEnd] = useState(booking?.end ?? "09:30");

    const [title, setTitle] = useState(booking?.title ?? "");
    const hasChanges =
        !booking ||
        booking.date !== date ||
        booking.start !== start ||
        booking.end !== end ||
        (booking.title ?? "") !== title.trim();

    const [error, setError] = useState<string | null>(null);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);

        if (!hasChanges) {
            onClose();
            return;
        }

        const validation = validateBookingTime(start, end);

        if (!validation.valid) {
            setError(validation.error ?? "Invalid booking time");
            return;
        }

        if (isPastTime(date, start)) {
            setError("You cannot book a time in the past");
            return;
        }

        onSubmit({
            date,
            start,
            end,
            title: title.trim() || undefined,
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
                <Input
                    id="booking-start"
                    label="Start"
                    type="time"
                    value={start}
                    min="09:00"
                    max="18:00"
                    onChange={(event) => setStart(event.target.value)}
                />

                <Input
                    id="booking-end"
                    label="End"
                    type="time"
                    value={end}
                    min="09:00"
                    max="18:00"
                    onChange={(event) => setEnd(event.target.value)}
                />
            </div>

            <Input
                id="booking-title"
                label="Title"
                type="text"
                value={title}
                placeholder="e.g. Team meeting"
                onChange={(event) => setTitle(event.target.value)}
            />

            {error && (
                <div className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-600">
                    {error}
                </div>
            )}

            <Button
                type="submit"
                className="w-full"
                disabled={!hasChanges || isSubmitting}
            >
                {isSubmitting
                    ? booking
                        ? "Updating..."
                        : "Creating..."
                    : booking
                      ? "Update booking"
                      : "Create booking"}
            </Button>
        </form>
    );
}
