import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  listing: mongoose.Types.ObjectId;
  guest: mongoose.Types.ObjectId;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  status: "confirmed" | "cancelled";
  numberOfGuests: number;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    listing: {
      type: Schema.Types.ObjectId,
      ref: "Listing",
      required: [true, "Please provide a listing"],
    },
    guest: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a guest"],
    },
    checkIn: {
      type: Date,
      required: [true, "Please provide check-in date"],
    },
    checkOut: {
      type: Date,
      required: [true, "Please provide check-out date"],
    },
    totalPrice: {
      type: Number,
      required: [true, "Please provide total price"],
      min: [0, "Total price cannot be negative"],
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
    numberOfGuests: {
      type: Number,
      required: [true, "Please provide number of guests"],
      min: [1, "Number of guests must be at least 1"],
    },
  },
  {
    timestamps: true,
  }
);

// Validate check-out date is after check-in date
bookingSchema.pre("save", function (next) {
  if (this.checkOut <= this.checkIn) {
    next(new Error("Check-out date must be after check-in date"));
  }
  next();
});

export default mongoose.model<IBooking>("Booking", bookingSchema);
