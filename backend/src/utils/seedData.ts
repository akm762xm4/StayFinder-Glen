import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User";
import Listing from "../models/Listing";
import Booking from "../models/Booking";
import connectDB from "../config/database";

dotenv.config();

const users = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "host",
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "host",
  },
  {
    name: "Mike Johnson",
    email: "mike@example.com",
    password: "password123",
    role: "user",
  },
  {
    name: "Sarah Wilson",
    email: "sarah@example.com",
    password: "password123",
    role: "host",
  },
  {
    name: "David Brown",
    email: "david@example.com",
    password: "password123",
    role: "user",
  },
];

const listings = [
  {
    title: "Luxury Beachfront Villa",
    description:
      "Beautiful villa with direct access to the beach. Enjoy stunning ocean views and modern amenities.",
    location: {
      address: "123 Beach Road",
      city: "Miami",
      state: "Florida",
      country: "USA",
      coordinates: {
        lat: 25.7617,
        lng: -80.1918,
      },
    },
    price: 500,
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227",
      "https://images.unsplash.com/photo-1613977257363-707ba9348228",
    ],
    amenities: ["Pool", "WiFi", "Kitchen", "Parking", "Air Conditioning"],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    title: "Downtown Modern Apartment",
    description:
      "Stylish apartment in the heart of the city. Perfect for business travelers or couples.",
    location: {
      address: "456 Main Street",
      city: "New York",
      state: "New York",
      country: "USA",
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    price: 200,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0268",
    ],
    amenities: ["WiFi", "Gym", "Doorman", "Air Conditioning"],
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    title: "Mountain View Cabin",
    description:
      "Cozy cabin with breathtaking mountain views. Perfect for nature lovers.",
    location: {
      address: "789 Mountain Road",
      city: "Denver",
      state: "Colorado",
      country: "USA",
      coordinates: {
        lat: 39.7392,
        lng: -104.9903,
      },
    },
    price: 300,
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937234",
    ],
    amenities: ["Fireplace", "WiFi", "Kitchen", "Hot Tub"],
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 1,
  },
  {
    title: "Historic City Center Loft",
    description:
      "Beautifully restored loft in a historic building. Experience the charm of old architecture with modern comforts.",
    location: {
      address: "321 Heritage Street",
      city: "Boston",
      state: "Massachusetts",
      country: "USA",
      coordinates: {
        lat: 42.3601,
        lng: -71.0589,
      },
    },
    price: 250,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93689",
    ],
    amenities: ["WiFi", "Kitchen", "Washer/Dryer", "Air Conditioning"],
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 1,
  },
  {
    title: "Lakeside Cottage",
    description:
      "Charming cottage on the lake. Perfect for fishing, swimming, and relaxation.",
    location: {
      address: "654 Lake Drive",
      city: "Seattle",
      state: "Washington",
      country: "USA",
      coordinates: {
        lat: 47.6062,
        lng: -122.3321,
      },
    },
    price: 350,
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c751",
    ],
    amenities: ["WiFi", "Kitchen", "Boat Dock", "Fireplace"],
    maxGuests: 5,
    bedrooms: 2,
    bathrooms: 2,
  },
  {
    title: "Desert Oasis Villa",
    description:
      "Luxurious villa in the desert with private pool and stunning views.",
    location: {
      address: "987 Desert Road",
      city: "Phoenix",
      state: "Arizona",
      country: "USA",
      coordinates: {
        lat: 33.4484,
        lng: -112.074,
      },
    },
    price: 450,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0d",
    ],
    amenities: ["Pool", "WiFi", "Kitchen", "Air Conditioning", "Gym"],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 3,
  },
  {
    title: "Urban Studio Apartment",
    description:
      "Modern studio apartment in a trendy neighborhood. Perfect for solo travelers or couples.",
    location: {
      address: "147 Urban Street",
      city: "Chicago",
      state: "Illinois",
      country: "USA",
      coordinates: {
        lat: 41.8781,
        lng: -87.6298,
      },
    },
    price: 150,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14b0",
    ],
    amenities: ["WiFi", "Kitchen", "Air Conditioning"],
    maxGuests: 2,
    bedrooms: 0,
    bathrooms: 1,
  },
  {
    title: "Vineyard Estate",
    description:
      "Beautiful estate surrounded by vineyards. Experience wine country living.",
    location: {
      address: "258 Vineyard Road",
      city: "Napa",
      state: "California",
      country: "USA",
      coordinates: {
        lat: 38.5025,
        lng: -122.2654,
      },
    },
    price: 600,
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118d",
    ],
    amenities: ["Pool", "WiFi", "Kitchen", "Wine Cellar", "Air Conditioning"],
    maxGuests: 8,
    bedrooms: 4,
    bathrooms: 3,
  },
  {
    title: "Ski Chalet",
    description:
      "Cozy chalet near the slopes. Perfect for winter sports enthusiasts.",
    location: {
      address: "369 Ski Road",
      city: "Aspen",
      state: "Colorado",
      country: "USA",
      coordinates: {
        lat: 39.1911,
        lng: -106.8175,
      },
    },
    price: 400,
    images: [
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b6",
      "https://images.unsplash.com/photo-1511884642898-4c92249e20b7",
    ],
    amenities: ["Fireplace", "WiFi", "Kitchen", "Hot Tub", "Ski Storage"],
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 2,
  },
  {
    title: "Island Paradise Villa",
    description:
      "Stunning villa on a private island. Experience ultimate luxury and privacy.",
    location: {
      address: "741 Island Way",
      city: "Honolulu",
      state: "Hawaii",
      country: "USA",
      coordinates: {
        lat: 21.3069,
        lng: -157.8583,
      },
    },
    price: 800,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0d",
    ],
    amenities: ["Pool", "WiFi", "Kitchen", "Beach Access", "Air Conditioning"],
    maxGuests: 10,
    bedrooms: 5,
    bathrooms: 4,
  },
];

const bookings = [
  {
    checkIn: new Date("2024-03-15"),
    checkOut: new Date("2024-03-20"),
    numberOfGuests: 2,
    status: "confirmed",
  },
  {
    checkIn: new Date("2024-04-01"),
    checkOut: new Date("2024-04-05"),
    numberOfGuests: 4,
    status: "pending",
  },
  {
    checkIn: new Date("2024-05-10"),
    checkOut: new Date("2024-05-15"),
    numberOfGuests: 2,
    status: "confirmed",
  },
  {
    checkIn: new Date("2024-06-20"),
    checkOut: new Date("2024-06-25"),
    numberOfGuests: 3,
    status: "pending",
  },
  {
    checkIn: new Date("2024-07-01"),
    checkOut: new Date("2024-07-10"),
    numberOfGuests: 2,
    status: "confirmed",
  },
];

const seedData = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Listing.deleteMany({});
    await Booking.deleteMany({});

    // Create users
    const createdUsers = await User.create(users);
    console.log("Users seeded successfully");

    // Create listings with host assignments
    const hostUsers = createdUsers.filter((user) => user.role === "host");
    const listingsWithHosts = listings.map((listing, index) => ({
      ...listing,
      host: hostUsers[index % hostUsers.length]._id,
    }));

    const createdListings = await Listing.create(listingsWithHosts);
    console.log("Listings seeded successfully");

    // Create bookings
    const regularUsers = createdUsers.filter((user) => user.role === "user");
    const bookingsWithData = bookings.map((booking, index) => {
      const listing = createdListings[index % createdListings.length];
      const guest = regularUsers[index % regularUsers.length];
      const nights = Math.ceil(
        (booking.checkOut.getTime() - booking.checkIn.getTime()) /
          (1000 * 60 * 60 * 24)
      );

      return {
        ...booking,
        listing: listing._id,
        guest: guest._id,
        totalPrice: nights * listing.price,
      };
    });

    await Booking.create(bookingsWithData);
    console.log("Bookings seeded successfully");

    console.log("Database seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
