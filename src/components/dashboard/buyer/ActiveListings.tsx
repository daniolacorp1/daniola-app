import React, { FC } from 'react';
// Remove if not used, or implement useAuthStore functionality
// import { useAuthStore } from "@/stores/useauthstore";

// If you don't have any props, you can use empty interface instead of Record
type ActiveListingsProps = object

export const ActiveListings: FC<ActiveListingsProps> = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Active Listings</h2>
      <div className="grid gap-4">
        {/* Add your listings content here */}
        <div className="p-4 border rounded-lg shadow-sm">
          {/* Example listing item */}
          <p>Your active listings will appear here</p>
        </div>
      </div>
    </div>
  );
};

// Since you're already exporting the component with 'export const',
// this default export is redundant. You can keep one or the other.
export default ActiveListings;