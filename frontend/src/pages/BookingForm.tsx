import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateBookingMutation } from "../api/serverApi";
import { ListingI } from "../api/types";
import { useState } from "react";
import { toast } from "sonner";

interface BookingFormProps {
  listing: ListingI;
  setIsOpen: (open: boolean) => void;
}

interface BookingFormInputs {
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
}

export function BookingForm({ listing, setIsOpen }: BookingFormProps) {
  const { register, handleSubmit, watch, reset } = useForm<BookingFormInputs>({
    defaultValues: {
      numberOfGuests: 1,
    },
  });
  const [createBooking, { isLoading }] = useCreateBookingMutation();
  const [formError, setFormError] = useState<string | null>(null);

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  let nights = 0;
  let totalPrice = 0;
  if (checkIn && checkOut) {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    nights = Math.max(
      0,
      (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    totalPrice = nights * listing.price;
  }

  const onSubmit: SubmitHandler<BookingFormInputs> = async (data) => {
    setFormError(null);
    if (!data.checkIn || !data.checkOut) {
      setFormError("Please select both check-in and check-out dates.");
      return;
    }
    if (new Date(data.checkIn) >= new Date(data.checkOut)) {
      setFormError("Check-out must be after check-in.");
      return;
    }
    if (data.numberOfGuests < 1 || data.numberOfGuests > listing.maxGuests) {
      setFormError(
        `Number of guests must be between 1 and ${listing.maxGuests}.`
      );
      return;
    }
    try {
      await createBooking({
        listingId: listing?._id!,
        checkIn: new Date(data.checkIn),
        checkOut: new Date(data.checkOut),
        numberOfGuests: data.numberOfGuests,
      })
        .unwrap()
        .then(() => {
          reset();
          setIsOpen(false);
          toast.success("Booking successful!");
        });
    } catch (e: any) {
      setFormError(e?.data?.message || "Booking failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="checkIn" className="text-sm font-medium">
          Check-in
        </label>
        <input
          id="checkIn"
          type="date"
          {...register("checkIn", { required: true })}
          className="h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm outline-none focus-visible:ring-1"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="checkOut" className="text-sm font-medium">
          Check-out
        </label>
        <input
          id="checkOut"
          type="date"
          {...register("checkOut", { required: true })}
          className="h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm outline-none focus-visible:ring-1"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="numberOfGuests" className="text-sm font-medium">
          Number of Guests
        </label>
        <input
          id="numberOfGuests"
          type="number"
          min={1}
          max={listing.maxGuests}
          {...register("numberOfGuests", {
            required: true,
            min: 1,
            max: listing.maxGuests,
          })}
          className="h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm outline-none focus-visible:ring-1"
        />
        <span className="text-xs text-muted-foreground">
          Max guests: {listing.maxGuests}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-base font-medium">
          Total Price: <span className="font-bold">${totalPrice}</span>
        </span>
        {nights > 0 && (
          <span className="text-xs text-muted-foreground">
            ({nights} night{nights > 1 ? "s" : ""} x ${listing.price}/night)
          </span>
        )}
      </div>
      {formError && <div className="text-red-500 text-sm">{formError}</div>}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 rounded-lg bg-accent/80 hover:bg-accent/90 text-white text-sm font-medium"
      >
        {isLoading ? "Booking..." : "Book Now"}
      </button>
    </form>
  );
}
