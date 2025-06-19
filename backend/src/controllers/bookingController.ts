import { Request, Response } from "express";
import Booking from "../models/Booking";
import Listing from "../models/Listing";

interface AuthRequest extends Request {
  user?: any;
}

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { listingId, checkIn, checkOut, numberOfGuests } = req.body;

    // Check if listing exists
    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Check if number of guests exceeds maximum
    if (numberOfGuests > listing.maxGuests) {
      return res.status(400).json({
        message: `Maximum ${listing.maxGuests} guests allowed`,
      });
    }

    // Calculate total price
    const nights = Math.ceil(
      (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    const totalPrice = nights * listing.price;

    const booking = await Booking.create({
      listing: listingId,
      guest: req.user._id,
      checkIn,
      checkOut,
      numberOfGuests,
      totalPrice,
    });

    res.status(201).json(booking);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user bookings
// @route   GET /api/bookings
// @access  Private
export const getUserBookings = async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await Booking.find({ guest: req.user._id })
      .populate({
        path: "listing",
        select: "title images location price",
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req: AuthRequest, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({
        path: "listing",
        select: "title images location price host",
      })
      .populate("guest", "name email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Check if user is the guest or the host
    if (
      booking.guest._id.toString() !== req.user._id.toString() &&
      booking.listing.toString() !== req.user._id.toString()
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(booking);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByIdAndUpdate(id, {
      status: "cancelled",
    });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
