"use client";
import { useState } from "react";
import {
  Calendar,
  MapPin,
  Phone,
  Receipt,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download,
  Star,
  CreditCard,
} from "lucide-react";
import Image from "next/image";
import useGetQuery from "@/hooks/queries/useGetQuery";
import useAuth from "@/hooks/useAuth";
import Pagination from "@/component/Pagination/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PrivateRoute from "@/routes/PrivateRoute";

export default function BookingPage() {
  const { authInfo } = useAuth();
  const [filter, setFilter] = useState("all");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const { data, isLoading } = useGetQuery({
    endpoint: `/my/bookings?page=${currentPage}`,
    token: true,
    queryKey: ["/my-bookings", currentPage, authInfo?.token],
    enabled: !!authInfo?.token,
  });

  const bookings = data?.data || [];

  const filterTabs = [
    { key: "all", label: "All Bookings", count: bookings?.length },
    {
      key: "confirmed",
      label: "Confirmed",
      count: bookings?.filter((b) => b.confirmed === 1)?.length,
    },
    {
      key: "pending",
      label: "Pending",
      count: bookings?.filter((b) => b.confirmed === 0)?.length,
    },
    {
      key: "cancelled",
      label: "Cancelled",
      count: bookings?.filter((b) => b.status === "cancelled")?.length,
    },
  ];

  const getStatusColor = (confirmed, status) => {
    if (confirmed === 1) {
      return {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: CheckCircle,
        label: "Confirmed",
      };
    } else if (status === "pending" || confirmed === 0) {
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: Clock,
        label: "Pending",
      };
    } else {
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: XCircle,
        label: "Cancelled",
      };
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateFinalAmount = (amount, discount, discountType) => {
    if (discountType === "static") {
      return amount - discount;
    } else if (discountType === "percentage") {
      return amount - (amount * discount) / 100;
    }
    return amount;
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true;
    if (filter === "confirmed") return booking.confirmed === 1;
    if (filter === "pending") return booking.confirmed === 0;
    if (filter === "cancelled") return booking.status === "cancelled";
    return true;
  });

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="animate-pulse space-y-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-lg"
            >
              <div className="flex gap-6">
                <div className="h-32 w-48 rounded-xl bg-gray-300"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-6 w-3/4 rounded bg-gray-300"></div>
                  <div className="h-4 w-1/2 rounded bg-gray-300"></div>
                  <div className="h-4 w-1/3 rounded bg-gray-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <PrivateRoute>
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-600">
            Manage and track all your reservations
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  filter === tab.key
                    ? "bg-primary text-white shadow-md"
                    : "hover:border-primary hover:text-primary border border-gray-200 bg-white text-gray-600"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-lg">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
              <Receipt size={32} className="text-gray-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900">
              No bookings found
            </h3>
            <p className="text-gray-600">
              You don&apos;t have any bookings yet. Start exploring and make
              your first reservation!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBookings.map((booking) => {
              const statusInfo = getStatusColor(
                booking.confirmed,
                booking.status,
              );
              const StatusIcon = statusInfo.icon;
              const finalAmount = calculateFinalAmount(
                booking.amount,
                booking.discount,
                booking.discount_type,
              );

              return (
                <div
                  key={booking.id}
                  className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <div className="p-6">
                    <div className="flex flex-col gap-6 lg:flex-row">
                      {/* Property Image */}
                      <div className="flex-shrink-0 lg:w-64">
                        <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-100 lg:h-40">
                          <Image
                            src={
                              booking.reference?.thumbnail ||
                              "/api/placeholder/300/200"
                            }
                            alt={booking.reference?.title || "Property"}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute top-3 right-3">
                            <div
                              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.bg} ${statusInfo.text} flex items-center gap-1`}
                            >
                              <StatusIcon size={12} />
                              {statusInfo.label}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Booking Details */}
                      <div className="flex-1 space-y-4">
                        {/* Header */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="mb-1 text-xl font-bold text-gray-900">
                              {booking.reference?.title || "Property Booking"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {booking.reference?.short_description}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-primary text-2xl font-bold">
                              ${finalAmount.toFixed(2)}
                            </div>
                            {booking.discount > 0 && (
                              <div className="text-sm text-gray-500">
                                <span className="line-through">
                                  ${booking.amount}
                                </span>
                                <span className="ml-2 font-medium text-green-600">
                                  -
                                  {booking.discount_type === "static"
                                    ? `$${booking.discount}`
                                    : `${booking.discount}%`}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Property Details */}
                        <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                          {booking.reference?.address && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <MapPin size={16} className="text-primary" />
                              <span>{booking.reference.address}</span>
                            </div>
                          )}
                          {booking.reference?.contact && (
                            <div className="flex items-center gap-2 text-gray-600">
                              <Phone size={16} className="text-primary" />
                              <span>{booking.reference.contact}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-gray-600">
                            <Receipt size={16} className="text-primary" />
                            <span>Invoice: {booking.invoice}</span>
                          </div>
                        </div>

                        {/* Booking Info */}
                        <div className="rounded-xl bg-gray-50 p-4">
                          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                            <div>
                              <span className="font-semibold text-gray-700">
                                Booked On:
                              </span>
                              <div className="mt-1 flex items-center gap-1">
                                <Calendar size={14} className="text-gray-500" />
                                <span className="text-gray-600">
                                  {formatDate(booking.created_at)}
                                </span>
                              </div>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">
                                Last Updated:
                              </span>
                              <div className="mt-1 flex items-center gap-1">
                                <Clock size={14} className="text-gray-500" />
                                <span className="text-gray-600">
                                  {formatDate(booking.updated_at)}
                                </span>
                              </div>
                            </div>
                            <div>
                              <span className="font-semibold text-gray-700">
                                Payment:
                              </span>
                              <div className="mt-1 flex items-center gap-1">
                                <CreditCard
                                  size={14}
                                  className="text-gray-500"
                                />
                                <span className="text-gray-600">
                                  {booking.gateway || "Cash Payment"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 pt-2">
                          <button className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-2 text-white transition-all duration-300">
                            <Eye size={16} />
                            View Details
                          </button>
                          <button className="hover:border-primary hover:text-primary flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-all duration-300">
                            <Download size={16} />
                            Download Invoice
                          </button>
                          {booking.confirmed === 1 && (
                            <button className="border-accent text-accent hover:bg-accent flex items-center gap-2 rounded-lg border px-4 py-2 transition-all duration-300 hover:text-white">
                              <Star size={16} />
                              Write Review
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination would go here using data?.pagination */}
        {data?.pagination && (
          <Pagination
            pagination={data?.pagination}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </PrivateRoute>
  );
}
