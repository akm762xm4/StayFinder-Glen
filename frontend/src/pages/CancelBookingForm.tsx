import { BookingI } from "../api/types";
import { useCancelBookingMutation } from "../api/serverApi";
import { useState } from "react";
import { toast } from "sonner";

interface CancelBookingFormProps {
  booking: BookingI;
  setIsOpen: (open: boolean) => void;
}

export function CancelBookingForm({
  booking,
  setIsOpen,
}: CancelBookingFormProps) {
  const [cancelBooking, { isLoading }] = useCancelBookingMutation();
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async () => {
    setError(null);
    try {
      await cancelBooking(booking._id!)
        .unwrap()
        .then(() => {
          setIsOpen(false);
          toast.success("Booking cancelled successfully.");
        });
    } catch (e: any) {
      setError(
        e?.data?.message || "Failed to cancel booking. Please try again."
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="md:text-base text-sm text-muted-foreground">
        Are you sure you want to cancel your booking for{" "}
        <span className="font-semibold">{booking.listing.title}</span>?
      </p>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        onClick={handleCancel}
        disabled={isLoading}
        className="ml-auto px-4 py-2 rounded-lg bg-accent cursor-pointer text-white text-sm font-medium"
      >
        {isLoading ? "Cancelling..." : "Cancel Booking"}
      </button>
    </div>
  );
}
