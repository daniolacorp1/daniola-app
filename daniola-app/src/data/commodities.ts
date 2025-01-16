// src/data/commodities.ts
import type { Commodity } from "@/types/marketplace";

export const commodities: Commodity[] = [
  {
    id: 1,
    name: "Commodity 1",
    price: 100,          // Make sure this is a number, not a string
    category: "Category 1",
    description: "Description 1",
    location: "Location 1",
    supplier: {
      id: 1,
      name: "Supplier 1",
      company: "Company 1",
      avatar: "/path/to/avatar1.jpg"
    },
    certification: "Certification 1",
    image: "/path/to/image1.jpg",
    stock: 100,
    rating: 4.5,
    priceChange: 0.5,
    quantity: 50,
    quantityChange: 1
  },
  // ... more commodities
];