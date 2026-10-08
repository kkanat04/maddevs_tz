import { connection } from "next/server";
import { getTodayDate } from "@/utils/dateUtils";
import BookingPage from "@/components/BookingPage";

export default async function Page() {
    await connection();

    const today = getTodayDate();

    return <BookingPage initialDate={today} />;
}
