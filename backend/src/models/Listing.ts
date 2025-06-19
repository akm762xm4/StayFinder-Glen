import mongoose, { Document, Schema } from "mongoose";

export interface IListing extends Document {
  title: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  price: number;
  images: string[];
  amenities: string[];
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  host: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const listingSchema = new Schema<IListing>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    location: {
      address: {
        type: String,
        required: [true, "Please provide an address"],
      },
      city: {
        type: String,
        required: [true, "Please provide a city"],
      },
      state: {
        type: String,
        required: [true, "Please provide a state"],
      },
      country: {
        type: String,
        required: [true, "Please provide a country"],
      },
      coordinates: {
        lat: {
          type: Number,
          required: [true, "Please provide latitude"],
        },
        lng: {
          type: Number,
          required: [true, "Please provide longitude"],
        },
      },
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: [0, "Price cannot be negative"],
    },
    images: [
      {
        type: String,
        required: [true, "Please provide at least one image"],
      },
    ],
    amenities: [
      {
        type: String,
      },
    ],
    maxGuests: {
      type: Number,
      required: [true, "Please provide maximum number of guests"],
      min: [1, "Maximum guests must be at least 1"],
    },
    bedrooms: {
      type: Number,
      required: [true, "Please provide number of bedrooms"],
      min: [0, "Number of bedrooms cannot be negative"],
    },
    bathrooms: {
      type: Number,
      required: [true, "Please provide number of bathrooms"],
      min: [0, "Number of bathrooms cannot be negative"],
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a host"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IListing>("Listing", listingSchema);
