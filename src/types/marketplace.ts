export interface Supplier {
  name: string;
  company: string;
  avatar: string;
}

export interface Commodity {
  id: number;
  name: string;
  price: number;
  location: string;
  supplier: Supplier;
  certification: string;
  description: string;
  image: string;
  priceChange: number;
  quantity: string;
  quantityChange: number;
}

export interface Listing {
  id: string;
  title: string;
  image: string;
  price: string;
  location?: string;
  category?: string;
  rating?: number;
}