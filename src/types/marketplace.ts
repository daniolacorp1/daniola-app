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

export type Listing = {
  title: string;
  image: string;
  rating: number;
  price: string;
  id: string;
};