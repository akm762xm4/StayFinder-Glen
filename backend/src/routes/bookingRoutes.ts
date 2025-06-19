import express from "express";
import {
  createBooking,
  getUserBookings,
  getBooking,
  cancelBooking,
} from "../controllers/bookingController";
import { protect } from "../middleware/auth";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/", protect, getUserBookings);
router.get("/:id", protect, getBooking);
router.put("/:id", protect, cancelBooking);

export default router;
