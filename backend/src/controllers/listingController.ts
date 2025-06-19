import { Request, Response } from "express";
import Listing from "../models/Listing";

interface AuthRequest extends Request {
  user?: any;
}

// @desc    Get all listings
// @route   GET /api/listings
// @access  Public
export const getListings = async (req: Request, res: Response) => {
  try {
    const listings = await Listing.find(
      {},
      {
        title: 1,
        description: 1,
        location: 1,
        price: 1,
        images: { $slice: 1 },
      }
    ).sort({ createdAt: -1 });
    res.json(listings);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single listing
// @route   GET /api/listings/:id
// @access  Public
export const getListing = async (req: Request, res: Response) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "host",
      "name email"
    );

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
