import { getTodayDate } from "@/utils/dateUtils";
import BookingPage from "@/components/BookingPage";

export default function Page() {
    const today = getTodayDate();

    return <BookingPage initialDate={today} />;
}
