import { useGetListingsQuery } from "../api/serverApi";
import { PropertyCard } from "../components/properties/PropertyCard";
import { ListingI } from "../api/types";
import { Loader } from "../components/layout/Loader";

export function Properties() {
  const { data: listings, isLoading } = useGetListingsQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 px-[5%] p-4">
      {listings?.map((listing: ListingI) => (
        <PropertyCard key={listing._id} listing={listing} />
      ))}
    </div>
  );
}
