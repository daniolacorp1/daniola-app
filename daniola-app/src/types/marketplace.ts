export interface Supplier {
  id: number;
  name: string;
  company: string;
  avatar: string;
}


export interface Commodity {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  location: string;
  supplier: Supplier;  // Using the Supplier interface
  certification: string;
  image: string;
  stock: number;
  rating: number;
  priceChange: number;
  quantity: number;
  quantityChange: number;
}
export type Listing = {
  title: string;
  image: string;
  rating: number;
  price: string;
  id: string;
};