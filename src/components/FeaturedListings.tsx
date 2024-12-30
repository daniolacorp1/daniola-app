import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { type Listing } from "@/types/marketplace";

interface FeaturedListingsProps {
  listings?: Listing[];
  isLoading?: boolean;
  onListingClick?: (listing: Listing) => void;
}

export const FeaturedListings = ({
  listings = [],
  isLoading = false,
  onListingClick,
}: FeaturedListingsProps) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="relative">
      <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
        {listings.map((listing, index) => (
          <motion.div
            key={listing.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-none w-[160px] snap-start group bg-white rounded-xl overflow-hidden cursor-pointer"
            onClick={() => onListingClick?.(listing)}
          >
            <div className="flex flex-col">
              <div className="relative aspect-square rounded-xl">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="p-2 text-left">
              <h3 className="font-medium text-sm text-gray-900">
                {listing.title}
              </h3>
              <p className="text-sm text-red-500 mt-1">See all</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
};
