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
  Zap,
  Droplets,
  Wifi,
  Shield,
  Car,
  Coffee,
  Wrench,
} from "lucide-react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

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
const addons = [
  {
    id: 1,
    name: "Power Hookup (240V)",
    description: "Electrical connection for your caravan",
    price: 15.0,
    icon: <Zap className="w-5 h-5" />,
    popular: true,
  },
  {
    id: 2,
    name: "Water Connection",
    description: "Fresh water supply hookup",
    price: 10.0,
    icon: <Droplets className="w-5 h-5" />,
  },
  {
    id: 3,
    name: "WiFi Access",
    description: "High-speed internet connection",
    price: 8.0,
    icon: <Wifi className="w-5 h-5" />,
  },
  {
    id: 4,
    name: "24/7 Security",
    description: "Enhanced security monitoring",
    price: 12.0,
    icon: <Shield className="w-5 h-5" />,
  },
  {
    id: 5,
    name: "Waste Disposal",
    description: "Access to dump station",
    price: 5.0,
    icon: <Car className="w-5 h-5" />,
  },
  {
    id: 6,
    name: "Amenities Access",
    description: "Shower, toilet, and laundry facilities",
    price: 20.0,
    icon: <Coffee className="w-5 h-5" />,
  },
  {
    id: 7,
    name: "Maintenance Kit",
    description: "Basic tools and maintenance supplies",
    price: 25.0,
    icon: <Wrench className="w-5 h-5" />,
  },
];

export default function CaravanParkingBooking() {
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
    0
  );
  const finalTotal = baseTotal + addonsTotal;

  // submit parking details
  const handleSubmit = () => {
    if (
      !formData.licenseNumber ||
      !formData.licenseState ||
      !formData.dateOfBirth
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const bookingData = {
      vh_type: formData.vehicleType,
      license_plate: formData.licensePlate,
      driving_license: formData.licenseNumber,
      license_state: formData.licenseState,
      dob: formData.dateOfBirth,
      checkin: dateRange[0].startDate,
      checkout: dateRange[0].endDate,
    };

    // OLD Data patter
    // const bookingData = {
    //   dateRange: dateRange[0],
    //   driverDetails: formData,
    //   addons: selectedAddons,
    //   pricing: {
    //     basePricePerNight,
    //     totalDays,
    //     baseTotal,
    //     addonsTotal,
    //     finalTotal,
    //   },
    //   timestamp: new Date().toISOString(),
    // };

    console.log("Booking submitted:", bookingData);
    alert("Caravan parking spot booked successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white backdrop-blur-sm px-4 py-2 rounded-full border border-line/20 mb-6">
            <Truck className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted">
              Caravan Parking
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Parking Spot
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Secure and comfortable parking for your caravan with optional
            services and amenities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Date Selection */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-[#B63D5E]" />
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
            <div className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-[#B63D5E]" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Driver Details
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* driving license number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Driving License Number *
                  </label>
                  <input
                    type="text"
                    name="licenseNumber"
                    value={formData.licenseNumber}
                    onChange={handleInputChange}
                    placeholder="Enter license number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#B63D5E] focus:border-[#B63D5E] transition-colors"
                    required
                  />
                </div>

                {/* license state */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    License State *
                  </label>
                  <select
                    name="licenseState"
                    value={formData.licenseState}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#B63D5E] focus:border-[#B63D5E] transition-colors"
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
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#B63D5E] focus:border-[#B63D5E] transition-colors"
                    required
                  />
                </div>

                {/* License Plate Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    License Plate Number *
                  </label>
                  <input
                    type="text"
                    name="licensePlate"
                    value={formData.licensePlate}
                    onChange={handleInputChange}
                    placeholder="Enter license plate number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#B63D5E] focus:border-[#B63D5E] transition-colors"
                    required
                  />
                </div>

                {/* Vehicle Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Vehicle Type *
                  </label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#B63D5E] focus:border-[#B63D5E] transition-colors"
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
            <div className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <Plus className="w-6 h-6 text-[#B63D5E]" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Additional Services
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addons.map((addon) => {
                  const isSelected = selectedAddons.find(
                    (item) => item.id === addon.id
                  );
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? "border-[#B63D5E] bg-[#B63D5E]/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {addon.popular && (
                        <div className="absolute -top-2 -right-2 bg-[#B63D5E] text-white text-xs px-2 py-1 rounded-full font-semibold">
                          Popular
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected
                              ? "bg-[#B63D5E] text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {addon.icon}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">
                              {addon.name}
                            </h3>
                            {isSelected && (
                              <Check className="w-4 h-4 text-[#B63D5E]" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
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
              <div className="bg-white rounded-2xl p-6 border border-gray-200/50 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-6 h-6 text-[#B63D5E]" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Booking Summary
                  </h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold">
                      {totalDays} night{totalDays > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Base Rate</span>
                    <span className="font-semibold">
                      ${basePricePerNight.toFixed(2)}/night
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">
                      ${baseTotal.toFixed(2)}
                    </span>
                  </div>

                  {selectedAddons.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex justify-between items-center py-2 border-b border-gray-100"
                    >
                      <span className="text-sm text-gray-600">
                        {addon.name}
                      </span>
                      <span className="text-sm font-semibold">
                        ${(addon.price * totalDays).toFixed(2)}
                      </span>
                    </div>
                  ))}

                  {addonsTotal > 0 && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Add-ons Subtotal</span>
                      <span className="font-semibold">
                        ${addonsTotal.toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="bg-[#B63D5E]/5 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-[#B63D5E]">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-[#B63D5E] to-[#603C59] text-white font-bold py-4 rounded-xl hover:from-[#603C59] hover:to-[#B63D5E] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <MapPin className="w-5 h-5" />
                  Book Parking Spot
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
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
