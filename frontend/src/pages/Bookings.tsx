import { useGetBookingsQuery } from "../api/serverApi";
import { BookingCard } from "../components/bookings/BookingCard";
import { BookingI } from "../api/types";
import { Calendar } from "lucide-react";
import { Loader } from "../components/layout/Loader";

export function Bookings() {
  const { data: bookings, isLoading } = useGetBookingsQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (!bookings || !bookings.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-gray-500">
        <Calendar className="h-16 w-16 mb-4 text-muted-foreground" />
        <h3 className="text-xl font-medium mb-2">No Bookings Found</h3>
        <p className="text-gray-400">You haven't made any bookings yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 md:px-[15%] p-4">
      {bookings?.map((booking: BookingI) => (
        <BookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
}
