"use client";

import { Booking } from "@/features/bookings/types";
import Button from "@/components/ui/Button";

type BookingItemProps = {
    booking: Booking;
    onEdit: (booking: Booking) => void;
    onDelete: (id: string) => void;
};

export default function BookingItem({
    booking,
    onEdit,
    onDelete,
}: BookingItemProps) {
    return (
        <div className="group flex items-center justify-between rounded-xl border border-neutral-200 p-4 transition hover:border-neutral-300 hover:shadow-sm">
            <div className="flex items-center gap-4">
                <div className="flex min-w-24 flex-col">
                    <span className="text-sm font-semibold text-neutral-950">
                        {booking.start}
                    </span>

                    <span className="text-xs text-neutral-400">
                        {booking.end}
                    </span>
                </div>

                <div className="h-8 w-px bg-neutral-200" />

                <div>
                    <p className="text-sm font-medium text-neutral-900">
                        {booking.title || "Untitled meeting"}
                    </p>

                    <p className="mt-0.5 text-xs text-neutral-400">
                        Meeting room
                    </p>
                </div>
            </div>

            <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                <Button variant="ghost" onClick={() => onEdit(booking)}>
                    Edit
                </Button>

                <Button variant="danger" onClick={() => onDelete(booking.id)}>
                    Delete
                </Button>
            </div>
        </div>
    );
}
