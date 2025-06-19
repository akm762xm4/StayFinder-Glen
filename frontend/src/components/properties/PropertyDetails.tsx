import { useNavigate, useParams } from "react-router-dom";
import { useGetListingQuery } from "../../api/serverApi";
import { ArrowLeftIcon, Bath, BedDouble, Users } from "lucide-react";
import { useState } from "react";
import { Modal } from "../layout/Modal";
import { BookingForm } from "../../pages/BookingForm";
import { getToken } from "../../utils/localStorage";
import { RequiredLogin } from "../../pages/RequiredLogin";
import { Loader } from "../layout/Loader";

export function PropertyDetails() {
  const token = getToken();
  const { id } = useParams();
  const { data: listing, isLoading } = useGetListingQuery(id || "");
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Image Gallery */}
      <div className="mb-6 relative">
        <img
          src={listing?.images[0]}
          alt={listing?.title}
          className="rounded-lg w-full h-80 object-cover"
          loading="lazy"
        />
        <button
          title="back"
          className="bg-white text-black p-2 rounded-full absolute top-2 left-2 cursor-pointer  shadow-2xl shadow-secondary"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon className="w-6 h-6 hover:scale-[1.15] transition-transform" />
        </button>
      </div>

      {/* Title & Location */}
      <div className="flex flex-col gap-2">
        <h1 className="md:text-3xl text-2xl font-bold">{listing?.title}</h1>
        <p className="text-muted-foreground">
          {listing?.location.address}, {listing?.location.city},{" "}
          {listing?.location.state}, {listing?.location.country}
        </p>
      </div>

      {/* Host Info */}
      {listing?.host && (
        <div className="flex items-center gap-3 my-4">
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold">
            {listing.host.name[0]}
          </div>
          <div>
            <div className="font-medium">Hosted by {listing.host.name}</div>
            <div className="text-xs text-muted-foreground">
              {listing.host.email}
            </div>
          </div>
        </div>
      )}

      {/* Description */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">About this place</h2>
        <p className="text-base">{listing?.description}</p>
      </div>

      {/* Amenities */}
      {listing?.amenities && listing.amenities.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Amenities</h2>
          <ul className="flex flex-wrap gap-3">
            {listing.amenities.map((amenity: string, idx: number) => (
              <li key={idx} className="bg-accent/10 px-3 py-1 rounded text-sm">
                {amenity}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Details */}
      <div className="flex gap-6 mb-4">
        <div className="flex flex-col items-center gap-1 bg-accent/10 p-2 rounded-lg">
          <Users className="w-6 h-6 " />
          <span className=" text-xs">{listing?.maxGuests} guests</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-accent/10 p-2 rounded-lg">
          <BedDouble className="w-6 h-6 " />
          <span className=" text-xs">{listing?.bedrooms} bedroom</span>
          {listing?.bedrooms && listing?.bedrooms > 1 ? "s" : ""}
        </div>
        <div className="flex flex-col items-center gap-1 bg-accent/10 p-2 rounded-lg">
          <Bath className="w-6 h-6 " />
          <span className=" text-xs">{listing?.bathrooms} bathroom</span>
          {listing?.bathrooms && listing?.bathrooms > 1 ? "s" : ""}
        </div>
      </div>

      {/* Price & Book Button */}
      <div className="flex items-center justify-between bg-accent/10 p-4 rounded-lg mb-4">
        <span className="text-2xl font-bold">
          ${listing?.price}{" "}
          <span className="text-base font-normal">/ night</span>
        </span>
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 rounded bg-accent/80 hover:bg-accent/90 text-white md:text-lg text-base font-medium"
        >
          Book Now
        </button>
      </div>
      {openModal && (
        <Modal
          title="Booking"
          setIsOpen={setOpenModal}
          child={
            token ? (
              <BookingForm listing={listing!} setIsOpen={setOpenModal} />
            ) : (
              <RequiredLogin setIsOpen={setOpenModal} />
            )
          }
        />
      )}
    </div>
  );
}
