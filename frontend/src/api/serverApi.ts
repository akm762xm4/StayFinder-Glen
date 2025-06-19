import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BookingFormI, BookingI, ListingI, UserI } from "./types";
import { getToken } from "../utils/localStorage";

const baseUrl = "stay-finder-glen-meq33ch0t-akm762xm4s-projects.vercel.app";
// const baseUrl = "http://localhost:5000/api"

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user", "listing", "booking"],
  endpoints: (builder) => ({
    // Auth
    signup: builder.mutation({
      query: (user: UserI) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (user: UserI) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["user"],
    }),
    // Listings
    getListings: builder.query<ListingI[], void>({
      query: () => "/listings",
      providesTags: ["listing"],
    }),
    getListing: builder.query<ListingI, string>({
      query: (id: string) => `/listings/${id}`,
      providesTags: ["listing"],
    }),
    // Bookings
    getBookings: builder.query<BookingI[], void>({
      query: () => "/bookings",
      providesTags: ["booking"],
    }),
    getBooking: builder.query({
      query: (id: string) => `/bookings/${id}`,
      providesTags: ["booking"],
    }),
    createBooking: builder.mutation<BookingI, BookingFormI>({
      query: (booking) => ({
        url: "/bookings",
        method: "POST",
        body: booking,
      }),
      invalidatesTags: ["booking"],
    }),
    cancelBooking: builder.mutation<BookingI, string>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetListingsQuery,
  useGetListingQuery,
  useGetBookingsQuery,
  useGetBookingQuery,
  useCreateBookingMutation,
  useCancelBookingMutation,
} = api;
