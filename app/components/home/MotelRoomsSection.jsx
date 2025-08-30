"use client";

import { useState } from "react";
import {
  Bed,
  Users,
  Wifi,
  Car,
  Coffee,
  Tv,
  Bath,
  Wind,
  Star,
  MapPin,
  Filter,
  Eye,
  ArrowRight,
} from "lucide-react";
import RoomImage from "@/public/cardImage/motel.jpg";
import Image from "next/image";
import Link from "next/link";
import { getApi } from "@/lib/api";
import useGetApi from "@/hooks/useGetApi";
import MotelCaravanCard from "@/component/cards/MotelCaravanCard";
import Pagination from "@/component/Pagination/Pagination";
import ShowAllBtn from "@/component/buttons/ShowAllBtn";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import SkeletonCard from "@/component/loaders/CardSkeleton";

const roomTypes = [
  { id: "all", label: "All Rooms", count: 12 },
  { id: "standard", label: "Standard", count: 6 },
  { id: "deluxe", label: "Deluxe", count: 4 },
  { id: "suite", label: "Suite", count: 2 },
];

const rooms = [
  {
    id: 1,
    name: "Standard Queen Room",
    type: "standard",
    price: 120,
    originalPrice: 150,
    rating: 4.5,
    reviews: 28,
    capacity: 2,
    beds: "1 Queen Bed",
    size: "25 m²",
    features: [
      "Free WiFi",
      "Air Conditioning",
      "TV",
      "Private Bathroom",
      "Coffee Maker",
    ],
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "AC" },
      { icon: Tv, label: "Smart TV" },
      { icon: Coffee, label: "Coffee" },
      { icon: Bath, label: "Private Bath" },
      { icon: Car, label: "Parking" },
    ],
    available: true,
    popular: false,
  },
  {
    id: 2,
    name: "Deluxe King Room",
    type: "deluxe",
    price: 180,
    originalPrice: 220,
    rating: 4.8,
    reviews: 45,
    capacity: 2,
    beds: "1 King Bed",
    size: "35 m²",
    features: [
      "Free WiFi",
      "Air Conditioning",
      "Smart TV",
      "Mini Fridge",
      "Premium Coffee",
      "Work Desk",
    ],
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "AC" },
      { icon: Tv, label: "Smart TV" },
      { icon: Coffee, label: "Premium Coffee" },
      { icon: Bath, label: "Luxury Bath" },
      { icon: Car, label: "Free Parking" },
    ],
    available: true,
    popular: true,
  },
  {
    id: 3,
    name: "Family Suite",
    type: "suite",
    price: 280,
    originalPrice: 340,
    rating: 4.9,
    reviews: 32,
    capacity: 4,
    beds: "1 King + 1 Sofa Bed",
    size: "50 m²",
    features: [
      "Free WiFi",
      "Air Conditioning",
      "2 Smart TVs",
      "Kitchenette",
      "Premium Coffee",
      "Living Area",
      "Balcony",
    ],
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "AC" },
      { icon: Tv, label: "2 Smart TVs" },
      { icon: Coffee, label: "Kitchenette" },
      { icon: Bath, label: "Luxury Bath" },
      { icon: Car, label: "Free Parking" },
    ],
    available: true,
    popular: false,
  },
  {
    id: 4,
    name: "Standard Twin Room",
    type: "standard",
    price: 110,
    originalPrice: 135,
    rating: 4.3,
    reviews: 18,
    capacity: 2,
    beds: "2 Single Beds",
    size: "25 m²",
    features: [
      "Free WiFi",
      "Air Conditioning",
      "TV",
      "Private Bathroom",
      "Coffee Maker",
    ],
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "AC" },
      { icon: Tv, label: "Smart TV" },
      { icon: Coffee, label: "Coffee" },
      { icon: Bath, label: "Private Bath" },
      { icon: Car, label: "Parking" },
    ],
    available: false,
    popular: false,
  },
  {
    id: 5,
    name: "Deluxe Double Room",
    type: "deluxe",
    price: 160,
    originalPrice: 190,
    rating: 4.6,
    reviews: 37,
    capacity: 2,
    beds: "1 Double Bed",
    size: "32 m²",
    features: [
      "Free WiFi",
      "Air Conditioning",
      "Smart TV",
      "Mini Fridge",
      "Premium Coffee",
      "City View",
    ],
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "AC" },
      { icon: Tv, label: "Smart TV" },
      { icon: Coffee, label: "Premium Coffee" },
      { icon: Bath, label: "Luxury Bath" },
      { icon: Car, label: "Free Parking" },
    ],
    available: true,
    popular: false,
  },
  {
    id: 6,
    name: "Executive Suite",
    type: "suite",
    price: 350,
    originalPrice: 420,
    rating: 5.0,
    reviews: 15,
    capacity: 4,
    beds: "1 King + Living Area",
    size: "65 m²",
    features: [
      "Free WiFi",
      "Air Conditioning",
      "3 Smart TVs",
      "Full Kitchen",
      "Premium Coffee",
      "Living Area",
      "Balcony",
      "Work Space",
    ],
    amenities: [
      { icon: Wifi, label: "Free WiFi" },
      { icon: Wind, label: "AC" },
      { icon: Tv, label: "3 Smart TVs" },
      { icon: Coffee, label: "Full Kitchen" },
      { icon: Bath, label: "Luxury Bath" },
      { icon: Car, label: "Free Parking" },
    ],
    available: true,
    popular: true,
  },
];

export default function MotelRoomsSection({ isPage = false }) {
  // const [selectedFilter, setSelectedFilter] = useState("all");

  // const filteredRooms =
  //   selectedFilter === "all"
  //     ? rooms
  //     : rooms.filter((room) => room.type === selectedFilter);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const { data: motels, isLoading } = useGetApi(`/motels?page=${currentPage}`);

  const featuredMotels =
    !isPage && motels?.data?.length > 0
      ? motels?.data?.slice(0, 6)
      : motels?.data || [];

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative py-20 bg-bg overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(96,60,89,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(123,166,147,0.1),transparent_50%)]"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white backdrop-blur-sm px-4 py-2 rounded-full border border-line/20 mb-6">
            <Bed className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted">
              Comfortable Stays
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Our Motel
            <span className="block text-primary">Room Options</span>
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Choose from our range of comfortable and well-equipped rooms,
            perfect for travelers seeking quality accommodation at great value.
          </p>
        </div>

        {/* Filter Options */}
        {/*   <div className="mb-12">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-muted mb-4 md:mb-0">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filter by Room Type:</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {roomTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedFilter(type.id)}
                  className={`cursor-pointer relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedFilter === type.id
                      ? "bg-primary text-white shadow shadow-primary/20"
                      : "bg-white backdrop-blur-sm text-primary border border-line/20 hover:border-primary/30"
                  }`}
                >
                  {type.label}
                  <span
                    className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      selectedFilter === type.id
                        ? "bg-white/20 text-white"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {type.count}
                  </span>
                  {selectedFilter === type.id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-lg"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div> */}

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : motels?.status &&
              featuredMotels?.map((motel) => (
                <MotelCaravanCard key={motel?.id} data={motel} />
              ))}
        </div>

        {!isLoading && motels?.status && isPage && (
          <Pagination
            pagination={motels?.pagination}
            onPageChange={handlePageChange}
          />
        )}

        {!isLoading && motels?.status && !isPage && (
          <ShowAllBtn href="/motels" label="Show All Rooms" />
        )}

        {/* No Results Message */}
        {/* {filteredRooms.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-line/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bed className="w-8 h-8 text-muted" />
            </div>
            <h3 className="text-xl font-bold text-text mb-2">No rooms found</h3>
            <p className="text-muted">Try selecting a different room type.</p>
          </div>
        )} */}
      </div>
    </section>
  );
}
