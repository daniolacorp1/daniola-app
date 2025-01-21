export interface Supplier {
<<<<<<< HEAD
  id: number;
=======
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
  name: string;
  company: string;
  avatar: string;
}

<<<<<<< HEAD

=======
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
export interface Commodity {
  id: number;
  name: string;
  price: number;
<<<<<<< HEAD
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
=======
  location: string;
  supplier: Supplier;
  certification: string;
  description: string;
  image: string;
  priceChange: number;
  quantity: string;
  quantityChange: number;
}

>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
export type Listing = {
  title: string;
  image: string;
  rating: number;
  price: string;
  id: string;
};