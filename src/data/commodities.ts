import { Commodity } from "@/types/marketplace";

export const commodities: Commodity[] = [
  {
    id: 1,
    name: "Brent Crude Oil",
    price: 78.49,
    location: "Saudi Arabia",
    supplier: {
      name: "PetroTech Industries",
      company: "PetroTech Industries Ltd",
      avatar: "/lovable-uploads/2b403044-7118-457b-a20f-68191960f899.png"
    },
    certification: "ISO 9001",
    description: "High-grade crude oil suitable for refining into various petroleum products.",
    image: "/lovable-uploads/f7f4374b-e564-4b94-8cad-ee77a2dc0cb9.png",
    priceChange: 2.3,
    quantity: "500,000 barrels",
    quantityChange: 5.0
  },
  {
    id: 2,
    name: "Gold",
    price: 1847.20,
    location: "South Africa",
    supplier: {
      name: "Sarah Johnson",
      company: "GoldCorp Mining",
      avatar: "https://images.unsplash.com/photo-1610375461246-83df859d849d"
    },
    certification: "LBMA Good Delivery",
    description: "99.99% pure gold bullion, meeting international standards for trade.",
    image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=2070",
    priceChange: 1.5,
    quantity: "1,000 oz",
    quantityChange: 10.0
  },
  {
    id: 3,
    name: "Copper",
    price: 9468.00,
    location: "Chile",
    supplier: {
      name: "Carlos Rodriguez",
      company: "Copper Americas Ltd",
      avatar: "https://images.unsplash.com/photo-1496661415325-ef852f9e8e7c"
    },
    certification: "LME Grade A",
    description: "High-purity copper cathodes for industrial applications.",
    image: "/lovable-uploads/bd025d10-a3e6-4b1f-b128-f124bc39f51d.png",
    priceChange: -0.8,
    quantity: "25 tonnes",
    quantityChange: -2.0
  },
  {
    id: 4,
    name: "Natural Gas",
    price: 4.88,
    location: "Qatar",
    supplier: {
      name: "Ahmed Al-Sayed",
      company: "QatarGas",
      avatar: "https://images.unsplash.com/photo-1626813822334-05dbca352ce1"
    },
    certification: "ISO 14001",
    description: "Liquefied natural gas for industrial and residential use.",
    image: "/lovable-uploads/87f31747-a7d0-4570-890a-3400aaa6cc66.png",
    priceChange: 3.2,
    quantity: "1M MMBtu",
    quantityChange: 10.0
  },
  {
    id: 5,
    name: "Silver",
    price: 23.50,
    location: "Mexico",
    supplier: {
      name: "Maria Garcia",
      company: "Silver Peak Mining",
      avatar: "/lovable-uploads/2b403044-7118-457b-a20f-68191960f899.png"
    },
    certification: "LBMA Good Delivery",
    description: "99.9% pure silver bullion, ideal for industrial and investment purposes.",
    image: "/lovable-uploads/f7f4374b-e564-4b94-8cad-ee77a2dc0cb9.png",
    priceChange: 0.8,
    quantity: "5,000 oz",
    quantityChange: 5.0
  }
];