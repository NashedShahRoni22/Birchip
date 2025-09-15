"use client";
import React, { useState } from "react";
import { DateRange } from "react-date-range";
import {
  Calendar,
  User,
  CreditCard,
  MapPin,
  Truck,
  Plus,
  Check,
  LoaderCircle,
} from "lucide-react";
import useGetQuery from "@/hooks/queries/useGetQuery";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { motion } from "framer-motion";
import usePostMutation from "@/hooks/mutations/usePostMutation";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import toast from "react-hot-toast";

const australianStates = [
  "New South Wales (NSW)",
  "Victoria (VIC)",
  "Queensland (QLD)",
  "Western Australia (WA)",
  "South Australia (SA)",
  "Tasmania (TAS)",
  "Australian Capital Territory (ACT)",
  "Northern Territory (NT)",
];

export default function CaravanParkingBooking() {
  const { authInfo } = useAuth();
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [formData, setFormData] = useState({
    licenseNumber: "",
    licenseState: "",
    dateOfBirth: "",
    licensePlate: "",
    vehicleType: "",
  });
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // fetch add ons
  const { data: addons } = useGetQuery({
    endpoint: "/parking-services",
    queryKey: ["/parking-services"],
    enabled: true,
  });

  const { mutate, isPending } = usePostMutation({
    endPoint: "/book-parking",
    token: true,
  });

  // handle date change
  const handleDateChange = (item) => {
    setDateRange([item.selection]);
  };

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // toggle addon
  const toggleAddon = (addon) => {
    setSelectedAddons((prev) => {
      const isSelected = prev.find((item) => item.id === addon.id);
      if (isSelected) {
        return prev.filter((item) => item.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const basePricePerNight = 35.0;
  const calculateTotalDays = () => {
    const start = dateRange[0].startDate;
    const end = dateRange[0].endDate;
    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff > 0 ? daysDiff : 1;
  };

  const totalDays = calculateTotalDays();
  const baseTotal = basePricePerNight * totalDays;
  const addonsTotal = selectedAddons.reduce(
    (sum, addon) => sum + addon.price * totalDays,
    0,
  );
  const finalTotal = baseTotal + addonsTotal;

  // submit parking details
  const handleSubmit = () => {
    // Validation with specific error messages
    if (!formData.licenseNumber) {
      toast.error("Driver's license number is required");
      return;
    }

    if (!formData.licenseState) {
      toast.error("License state is required");
      return;
    }

    if (!formData.dateOfBirth) {
      toast.error("Date of birth is required");
      return;
    }

    if (!dateRange || !dateRange[0]?.startDate || !dateRange[0]?.endDate) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    const submitFormData = new FormData();

    // Add basic form fields
    submitFormData.append("driving_license", formData.licenseNumber);
    submitFormData.append("license_state", formData.licenseState);
    submitFormData.append("dob", formData.dateOfBirth);
    submitFormData.append("license_plate", formData.licensePlate);
    submitFormData.append("vehicle_type", formData.vehicleType);

    // Format dates from full date string to YYYY-MM-DD format
    const formatDateToYMD = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    submitFormData.append("checkin", formatDateToYMD(dateRange[0].startDate));
    submitFormData.append("checkout", formatDateToYMD(dateRange[0].endDate));

    // Add selected addon IDs as references
    selectedAddons.forEach((addon, index) => {
      submitFormData.append(`references[${index}]`, addon.id);
    });

    mutate(submitFormData, {
      onSuccess: (data) => {
        if (data?.status) {
          window.location.href = data?.data?.checkout_url;
        }
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="border-line/20 mb-6 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 backdrop-blur-sm">
            <Truck className="text-primary h-4 w-4" />
            <span className="text-muted text-sm font-medium">
              Caravan Parking
            </span>
          </div>

          <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Book Your Parking Spot
          </h1>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Secure and comfortable parking for your caravan with optional
            services and amenities
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Booking Form */}
          <div className="space-y-8 lg:col-span-2">
            {/* Date Selection */}
            <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <Calendar className="h-6 w-6 text-[#B63D5E]" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Select Dates
                </h2>
              </div>
              <div className="flex justify-center">
                <DateRange
                  editableDateInputs={true}
                  onChange={handleDateChange}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  rangeColors={["#B63D5E"]}
                  minDate={new Date()}
                  className="rounded-xl"
                />
              </div>
            </div>

            {/* Driver Details */}
            <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <User className="h-6 w-6 text-[#B63D5E]" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Driver Details
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* driving license number */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    Driving License Number *
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    placeholder="Enter license number"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-colors focus:border-[#B63D5E] focus:ring-2 focus:ring-[#B63D5E]"
                    required
                  />
                </div>

                {/* license state */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    License State *
                  </label>
                  <select
                    name="licenseState"
                    value={formData.licenseState}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-colors focus:border-[#B63D5E] focus:ring-2 focus:ring-[#B63D5E]"
                    required
                  >
                    <option value="">Select state</option>
                    {australianStates.map((state, index) => (
                      <option key={index} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                {/* date of birth */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-colors focus:border-[#B63D5E] focus:ring-2 focus:ring-[#B63D5E]"
                    required
                  />
                </div>

                {/* License Plate Number */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    License Plate Number *
                  </label>
                  <input
                    type="text"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleInputChange}
                    placeholder="Enter license plate number"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-colors focus:border-[#B63D5E] focus:ring-2 focus:ring-[#B63D5E]"
                    required
                  />
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    Vehicle Type *
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 transition-colors focus:border-[#B63D5E] focus:ring-2 focus:ring-[#B63D5E]"
                    required
                  >
                    <option value="">Select vehicle type</option>
                    <option value="sedan">Sedan</option>
                    <option value="hatchback">Hatchback</option>
                    <option value="suv">SUV</option>
                    <option value="wagon">Station Wagon</option>
                    <option value="ute">Ute/Pickup</option>
                    <option value="van">Van</option>
                    <option value="coupe">Coupe</option>
                    <option value="convertible">Convertible</option>
                    <option value="motorcycle">Motorcycle</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Add-ons */}
            <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <Plus className="h-6 w-6 text-[#B63D5E]" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Additional Services
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {addons?.data &&
                  addons?.data?.length > 0 &&
                  addons?.data?.map((addon) => {
                    const isSelected = selectedAddons.find(
                      (item) => item.id === addon.id,
                    );
                    return (
                      // Add On Card
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 ${
                          isSelected
                            ? "border-[#B63D5E] bg-[#B63D5E]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        {addon.is_popular === 1 && (
                          <div className="absolute -top-2 -right-2 rounded-full bg-[#B63D5E] px-2 py-1 text-xs font-semibold text-white">
                            Popular
                          </div>
                        )}

                        <div className="flex items-start gap-3">
                          <Image
                            src={addon.icon}
                            alt="addon icon"
                            height={20}
                            width={20}
                          />

                          <div className="flex-1">
                            <div className="mb-1 flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">
                                {addon.title}
                              </h3>
                              {isSelected && (
                                <Check className="h-4 w-4 text-[#B63D5E]" />
                              )}
                            </div>
                            <p className="mb-2 text-sm text-gray-600">
                              {addon.description}
                            </p>
                            <p className="font-bold text-[#B63D5E]">
                              ${addon.price.toFixed(2)}/night
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Price Summary & Booking */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <div className="rounded-2xl border border-gray-200/50 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center gap-3">
                  <CreditCard className="h-6 w-6 text-[#B63D5E]" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Booking Summary
                  </h2>
                </div>
                <div className="mb-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 py-2">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">
                      {totalDays} night{totalDays > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-gray-100 py-2">
                    <span className="text-gray-600">Base Rate</span>
                    <span className="font-semibold">
                      ${basePricePerNight.toFixed(2)}/night
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-gray-100 py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      ${baseTotal.toFixed(2)}
                    </span>
                  </div>

                  {selectedAddons.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex items-center justify-between border-b border-gray-100 py-2"
                    >
                      <span className="text-sm text-gray-600">
                        {addon.title}
                      </span>
                      <span className="text-sm font-semibold">
                        ${(addon.price * totalDays).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  {addonsTotal > 0 && (
                    <div className="flex items-center justify-between border-b border-gray-100 py-2">
                      <span className="text-gray-600">Add-ons Subtotal</span>
                      <span className="font-semibold">
                        ${addonsTotal.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-6 rounded-xl bg-[#B63D5E]/5 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-[#B63D5E]">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {authInfo?.token ? (
                  <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B63D5E] to-[#603C59] py-4 font-bold text-white transition-all duration-300 hover:from-[#603C59] hover:to-[#B63D5E] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <MapPin size={20} />
                    Book Parking Spot
                    {isPending && (
                      <LoaderCircle size={20} className="animate-spin" />
                    )}
                  </button>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Link
                      href="/auth?redirect=caravan-parking"
                      className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-transparent bg-gradient-to-r from-[#B63D5E] to-[#603C59] py-4 font-bold text-white shadow-lg transition-all duration-300 hover:border-[#B63D5E]/30 hover:from-[#603C59] hover:to-[#B63D5E] hover:shadow-xl"
                    >
                      <MapPin className="h-5 w-5" />
                      Login to Book
                    </Link>
                  </motion.div>
                )}

                <p className="mt-4 text-center text-xs text-gray-500">
                  Secure booking • Free cancellation up to 24 hours before
                  arrival
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
