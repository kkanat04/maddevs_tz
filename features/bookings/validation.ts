import { Booking } from "./types";

const WORK_DAY_START = "09:00";
const WORK_DAY_END = "18:00";

const MIN_DURATION = 30;
const MAX_DURATION = 120;

type ValidationResult = {
    valid: boolean;
    error?: string;
};

function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
}

export function validateBookingTime(
    start: string,
    end: string,
): ValidationResult {
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);

    const workStart = timeToMinutes(WORK_DAY_START);
    const workEnd = timeToMinutes(WORK_DAY_END);

    if (startMinutes < workStart || endMinutes > workEnd) {
        return {
            valid: false,
            error: "Booking time must be between 09:00 and 18:00",
        };
    }

    if (startMinutes >= endMinutes) {
        return {
            valid: false,
            error: "Start time must be before end time",
        };
    }

    const duration = endMinutes - startMinutes;

    if (duration < MIN_DURATION) {
        return {
            valid: false,
            error: "Minimum booking duration is 30 minutes",
        };
    }

    if (duration > MAX_DURATION) {
        return {
            valid: false,
            error: "Maximum booking duration is 2 hours",
        };
    }

    return {
        valid: true,
    };
}

export function hasBookingConflict(
    bookings: Booking[],
    start: string,
    end: string,
    excludeId?: string,
): boolean {
    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);

    return bookings.some((booking) => {
        if (booking.id === excludeId) {
            return false;
        }

        const bookingStart = timeToMinutes(booking.start);
        const bookingEnd = timeToMinutes(booking.end);

        return startMinutes < bookingEnd && endMinutes > bookingStart;
    });
}

export function isPastTime(date: string, start: string): boolean {
    const today = new Date();

    const todayDate = `${today.getFullYear()}-${String(
        today.getMonth() + 1,
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    if (date !== todayDate) {
        return false;
    }

    const [hours, minutes] = start.split(":").map(Number);

    const startTime = new Date();
    startTime.setHours(hours, minutes, 0, 0);

    return startTime <= today;
}
