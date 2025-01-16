// src/types/listing.ts
export interface Listing {
    id: string;
    title: string;
    description: string;
    price: number;
    unit: string;
    status: 'active' | 'inactive' | 'pending';
    created_at: string;
    supplier: {
      id: string;
      full_name: string;
    };
  }