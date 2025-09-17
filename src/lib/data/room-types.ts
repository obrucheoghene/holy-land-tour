export interface RoomType {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  pricePerNight: number;
  maxOccupancy: number;
  availableRooms: number;
  imageUrl: string;
  amenities: string[];
  features: string[];
  popular?: boolean;
  upgrade?: boolean;
}

export const roomTypes: RoomType[] = [
  {
    id: "standard-single",
    name: "Standard Single Room",
    description:
      "Comfortable single occupancy room perfect for solo pilgrims. Features modern amenities, private bathroom, and peaceful atmosphere for personal reflection.",
    shortDescription: "Comfortable single room for solo travelers",
    pricePerNight: 120,
    maxOccupancy: 1,
    availableRooms: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070",
    amenities: [
      "Private bathroom with shower",
      "Air conditioning",
      "Free Wi-Fi",
      "Mini refrigerator",
      "Safe deposit box",
      "Desk and chair",
      "Daily housekeeping",
    ],
    features: [
      "City or garden view",
      "Quiet location",
      "Individual climate control",
      "Blackout curtains",
    ],
  },
  {
    id: "standard-double",
    name: "Standard Double Room",
    description:
      "Spacious double occupancy room ideal for couples or friends sharing. Twin beds or double bed available with all modern conveniences for a comfortable stay.",
    shortDescription: "Shared room for two travelers",
    pricePerNight: 85,
    maxOccupancy: 2,
    availableRooms: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070",
    amenities: [
      "Private bathroom with shower",
      "Air conditioning",
      "Free Wi-Fi",
      "Mini refrigerator",
      "Safe deposit box",
      "Two beds or one double",
      "Daily housekeeping",
    ],
    features: [
      "Choice of twin or double beds",
      "City or garden view",
      "Spacious layout",
      "Individual climate control",
    ],
    popular: true,
  },
  {
    id: "deluxe-suite",
    name: "Deluxe Suite",
    description:
      "Premium suite with separate living area, upgraded amenities, and enhanced comfort. Perfect for those seeking extra space and luxury during their spiritual journey.",
    shortDescription: "Spacious suite with living area",
    pricePerNight: 180,
    maxOccupancy: 2,
    availableRooms: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070",
    amenities: [
      "Separate living room",
      "Premium bathroom with bathtub",
      "Air conditioning",
      "Free Wi-Fi",
      "Mini bar",
      "Safe deposit box",
      "King-size bed",
      "Daily housekeeping",
      "Balcony or terrace",
    ],
    features: [
      "Separate living area",
      "Premium bedding",
      "City or sea view",
      "Enhanced privacy",
      "Room service available",
    ],
    upgrade: true,
  },
  {
    id: "family-room",
    name: "Family Room",
    description:
      "Large family-friendly room accommodating up to 4 guests. Features multiple beds and extra space for families traveling together on their Holy Land pilgrimage.",
    shortDescription: "Perfect for families with children",
    pricePerNight: 140,
    maxOccupancy: 4,
    availableRooms: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2070",
    amenities: [
      "Multiple beds configuration",
      "Large private bathroom",
      "Air conditioning",
      "Free Wi-Fi",
      "Mini refrigerator",
      "Safe deposit box",
      "Extra seating area",
      "Daily housekeeping",
    ],
    features: [
      "Extra space for families",
      "Multiple bed options",
      "Child-friendly amenities",
      "Easy access to facilities",
    ],
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    description:
      "Luxurious executive suite with panoramic views, premium furnishings, and exclusive amenities. The ultimate in comfort for your Holy Land experience.",
    shortDescription: "Luxury suite with premium amenities",
    pricePerNight: 250,
    maxOccupancy: 2,
    availableRooms: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?q=80&w=2070",
    amenities: [
      "Panoramic city/sea views",
      "Luxury bathroom with jacuzzi",
      "Premium air conditioning",
      "Free Wi-Fi",
      "Full mini bar",
      "Electronic safe",
      "King-size premium bed",
      "Twice daily housekeeping",
      "Private balcony",
      "Concierge service",
    ],
    features: [
      "Premium location",
      "Luxury furnishings",
      "Panoramic views",
      "Priority check-in",
      "Exclusive services",
      "Room service included",
    ],
    upgrade: true,
  },
];

// Helper functions
export const getRoomTypeById = (id: string): RoomType | undefined => {
  return roomTypes.find((room) => room.id === id);
};

export const getAvailableRoomTypes = (): RoomType[] => {
  return roomTypes.filter((room) => room.availableRooms > 0);
};

export const calculateTotalPrice = (
  roomTypeId: string,
  nights: number
): number => {
  const roomType = getRoomTypeById(roomTypeId);
  return roomType ? roomType.pricePerNight * nights : 0;
};
