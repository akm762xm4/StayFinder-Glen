import { ListingI } from "../../api/types";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  listing: ListingI;
}

export function PropertyCard({ listing }: PropertyCardProps) {
  const navigate = useNavigate();
  return (
    <div className="rounded-lg border border-secondary/20 text-card-foreground shadow-sm">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <img
          src={listing.images[0]}
          srcSet={`${listing.images[0]}?w=400 400w, ${listing.images[0]}?w=800 800w`}
          sizes="(max-width: 600px) 400px, 800px"
          alt={listing.title}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col p-4 gap-4">
        <div>
          <h3 className="text-lg font-semibold">{listing.title}</h3>
          <p className="md:text-sm text-xs text-muted-foreground">
            {listing.location.address}, {listing.location.city},{" "}
            {listing.location.state}, {listing.location.country}
          </p>
        </div>
        <p className="md:text-sm text-xs text-muted-foreground line-clamp-2">
          {listing.description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <p className="text-lg font-semibold">${listing.price}/night</p>
          <button
            onClick={() => navigate(`/property/${listing._id}`)}
            className="p-2 rounded bg-accent/80 hover:bg-accent/90 text-white text-sm font-medium"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
