export interface UserI {
  name?: string;
  email: string;
  password: string;
}

export interface ListingI {
  _id?: string;
  amenities: string[];
  bathrooms: number;
  bedrooms: number;
  maxGuests: number;
  price: number;
  title: string;
  description: string;
  images: string[];
  location: {
    address: string;
    city: string;
    country: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  host: {
    _id: string;
    name: string;
    email: string;
  };
}

export interface BookingI {
  _id?: string;
  listing: ListingI;
  guest: string;
  checkIn: Date;
  checkOut: Date;
  status: string;
  numberOfGuests: number;
  totalPrice: number;
  updatedAt: Date;
  createdAt: Date;
}

export interface BookingFormI {
  listingId: string; // listing id
  checkIn: Date;
  checkOut: Date;
  numberOfGuests: number;
}
