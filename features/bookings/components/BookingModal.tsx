"use client";

import Modal from "@/components/ui/Modal";
import BookingForm from "./BookingForm";
import { Booking } from "@/features/bookings/types";

type BookingModalProps = {
    isOpen: boolean;
    date: string;
    booking?: Booking | null;
    isSubmitting: boolean;
    onClose: () => void;
    onSubmit: (data: {
        date: string;
        start: string;
        end: string;
        title?: string;
    }) => void;
};

export default function BookingModal({
    isOpen,
    date,
    booking,
    onClose,
    onSubmit,
    isSubmitting,
}: BookingModalProps) {
    const isEditing = Boolean(booking);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditing ? "Edit booking" : "Create booking"}
        >
            <BookingForm
                isSubmitting={isSubmitting}
                date={date}
                onClose={onClose}
                booking={booking}
                onSubmit={onSubmit}
            />
        </Modal>
    );
}
