"use client";

import { useState } from "react";
import { Building2, Car, UtensilsCrossed } from "lucide-react";
import useGetQuery from "@/hooks/queries/useGetQuery";
import BookingCard from "@/component/cards/BookingCard";
import BookingsSkeleton from "@/component/loaders/BookingsSkeleton";
import TabButton from "@/component/buttons/TabButton";
import EmptyState from "@/component/ui/EmptyState";
import FoodOrderCard from "@/component/cards/FoodOrderCard";
import ParkingBookingCard from "@/component/cards/ParkingBookingCard";
import PrivateRoute from "@/routes/PrivateRoute";

export default function MyBookingsPage() {
  const [activeTab, setActiveTab] = useState("bookings");

  // API calls for different booking types
  const { data: bookingsData, isLoading: bookingsLoading } = useGetQuery({
    endpoint: "/my/bookings",
    token: true,
    queryKey: ["my-bookings"],
    enabled: activeTab === "bookings",
  });

  const { data: foodOrdersData, isLoading: foodOrdersLoading } = useGetQuery({
    endpoint: "/my/food-orders",
    token: true,
    queryKey: ["my-food-orders"],
    enabled: activeTab === "food-orders",
  });

  const { data: parkingsData, isLoading: parkingsLoading } = useGetQuery({
    endpoint: "/my/booked-parkings",
    token: true,
    queryKey: ["my-booked-parkings"],
    enabled: activeTab === "booked-parkings",
  });

  const isLoading = bookingsLoading || foodOrdersLoading || parkingsLoading;
  const currentData =
    activeTab === "bookings"
      ? bookingsData
      : activeTab === "food-orders"
        ? foodOrdersData
        : parkingsData;

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-[#FFF8F6]">
        {/* Header */}
        <div className="border-b border-[#E0E0E0] bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-[#2F2F2F]">My Bookings</h1>
            <p className="mt-1 text-[#888888]">
              Manage and track all your reservations
            </p>
          </div>
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Tab Navigation */}
          <div className="mb-8 flex gap-4 overflow-x-auto">
            <TabButton
              id="bookings"
              label="All Bookings"
              count={bookingsData?.data?.length || 0}
              icon={Building2}
              isActive={activeTab === "bookings"}
              setActiveTab={setActiveTab}
            />
            <TabButton
              id="food-orders"
              label="Food Orders"
              count={foodOrdersData?.data?.length || 0}
              icon={UtensilsCrossed}
              isActive={activeTab === "food-orders"}
              setActiveTab={setActiveTab}
            />
            <TabButton
              id="booked-parkings"
              label="Parking Bookings"
              count={parkingsData?.data?.length || 0}
              icon={Car}
              isActive={activeTab === "booked-parkings"}
              setActiveTab={setActiveTab}
            />
          </div>

          {/* Content */}
          {isLoading ? (
            <BookingsSkeleton />
          ) : (
            <>
              {activeTab === "bookings" && (
                <div className="space-y-6">
                  {currentData?.data?.length > 0 ? (
                    currentData.data.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} />
                    ))
                  ) : (
                    <EmptyState
                      title="No bookings found"
                      description="You haven't made any property bookings yet."
                      icon={Building2}
                    />
                  )}
                </div>
              )}

              {activeTab === "food-orders" && (
                <div className="space-y-6">
                  {currentData?.data?.length > 0 ? (
                    currentData.data.map((food) => (
                      <FoodOrderCard key={food.id} order={food} />
                    ))
                  ) : (
                    <EmptyState
                      title="No food orders found"
                      description="You haven't placed any food orders yet."
                      icon={UtensilsCrossed}
                    />
                  )}
                </div>
              )}

              {activeTab === "booked-parkings" && (
                <div className="space-y-6">
                  {currentData?.data?.length > 0 ? (
                    currentData.data.map((parking) => (
                      <ParkingBookingCard key={parking.id} order={parking} />
                    ))
                  ) : (
                    <EmptyState
                      title="No parking bookings found"
                      description="You haven't booked any parking spaces yet."
                      icon={Car}
                    />
                  )}
                </div>
              )}
            </>
          )}

          {/* TODO: Pagination goes here*/}
        </div>
      </div>
    </PrivateRoute>
  );
}
