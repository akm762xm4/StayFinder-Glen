import { ExternalLink } from "lucide-react";
import { BookingI } from "../../api/types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal } from "../layout/Modal";
import { CancelBookingForm } from "../../pages/CancelBookingForm";

interface BookingCardProps {
  booking: BookingI;
}

export function BookingCard({ booking }: BookingCardProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="flex flex-col gap-4 border border-secondary/20 rounded-lg">
      <div className="flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h3 className="flex items-center md:text-lg text-base font-semibold">
              {booking.listing.title}
              <button
                title="listing"
                onClick={() => {
                  navigate(`/property/${booking.listing._id}`);
                }}
                className="mx-1 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </h3>
            <p className="md:text-sm text-xs text-muted-foreground">
              {booking.listing.location.address},{" "}
              {booking.listing.location.city}, {booking.listing.location.state},{" "}
              {booking.listing.location.country}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-muted-foreground">Check-in</p>
              <p>{new Date(booking.checkIn).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Check-out</p>
              <p>{new Date(booking.checkOut).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between bg-accent/10 p-2 border-t border-secondary/20">
        <div>
          <p className="text-muted-foreground">Total Price</p>
          <p className="md:text-lg text-base font-semibold">
            ${booking.totalPrice}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span
            className={`md:px-4 px-2 py-2 rounded text-xs font-medium border border-secondary/20 ${
              statusColors[booking.status as keyof typeof statusColors]
            }`}
          >
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </span>
          {booking._id && booking.status === "confirmed" && (
            <button
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 text-xs font-medium"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
      {isOpen && (
        <Modal
          title="Cancel Booking"
          setIsOpen={setIsOpen}
          child={<CancelBookingForm booking={booking} setIsOpen={setIsOpen} />}
        />
      )}
    </div>
  );
}
