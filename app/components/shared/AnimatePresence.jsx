"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import toast from "react-hot-toast";

// Australian states and territories for the dropdown
const australianStates = [
  { code: "", name: "Select State/Territory" },
  { code: "NSW", name: "New South Wales" },
  { code: "VIC", name: "Victoria" },
  { code: "QLD", name: "Queensland" },
  { code: "WA", name: "Western Australia" },
  { code: "SA", name: "South Australia" },
  { code: "TAS", name: "Tasmania" },
  { code: "ACT", name: "Australian Capital Territory" },
  { code: "NT", name: "Northern Territory" },
];

export function BookingModal({
  isOpen,
  onClose,
  itemId,
  itemType,
  onBookingSuccess,
}) {
  // Default values
  const getDefaultDateRange = () => [
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      key: "selection",
    },
  ];

  const getDefaultGuests = () => ({ adults: 1, children: 0 });

  // State with default values
  const [dateRange, setDateRange] = useState(getDefaultDateRange());
  const [guests, setGuests] = useState(getDefaultGuests());
  const [drivingLicenseNumber, setDrivingLicenseNumber] = useState("");
  const [licenseState, setLicenseState] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  // Reset all values to default when modal closes
  const resetAllValues = () => {
    setDateRange(getDefaultDateRange());
    setGuests(getDefaultGuests());
    setDrivingLicenseNumber("");
    setLicenseState("");
    setDateOfBirth("");
  };

  // Handle modal close with reset
  const handleClose = () => {
    onClose();
    resetAllValues();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Reset when modal opens (in case it was closed improperly)
  useEffect(() => {
    if (isOpen) {
      resetAllValues();
    }
  }, [isOpen]);

  const handleDateChange = (item) => {
    setDateRange([item.selection]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!drivingLicenseNumber || !licenseState || !dateOfBirth) {
      toast.error("Please fill in all required fields");
      return;
    }

    const bookingFormData = {
      driving_license: drivingLicenseNumber,
      license_state: licenseState,
      dob: dateOfBirth,
      checkin: dateRange[0].startDate,
      checkout: dateRange[0].endDate,
      adults: guests.adults,
      children: guests.children,
      itemId,
      itemType,
    };

    onBookingSuccess(bookingFormData);
    // Reset values after successful booking
    resetAllValues();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(4px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-black/30"
            onClick={handleClose}
          />

          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-primary p-4 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">
                    Reserve Your{" "}
                    {itemType === "room"
                      ? "Room"
                      : itemType === "caravan"
                        ? "Caravan"
                        : "Meal"}
                  </h2>
                  <button
                    onClick={handleClose}
                    className="rounded-full p-1 transition-colors hover:bg-white/20"
                  >
                    <X size={20} />
                  </button>
                </div>
                <p className="mt-2 text-sm opacity-90">
                  Fill in the details below to reserve your{" "}
                  {itemType === "room"
                    ? "room"
                    : itemType === "caravan"
                      ? "caravan"
                      : "meal"}
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="max-h-[80vh] space-y-6 overflow-y-auto bg-white p-6"
              >
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Dates
                  </label>
                  <div className="flex justify-center rounded-lg p-3 shadow">
                    <DateRange
                      editableDateInputs={true}
                      onChange={handleDateChange}
                      moveRangeOnFirstSelection={false}
                      ranges={dateRange}
                      rangeColors={["#B63D5E"]}
                      minDate={new Date()}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Total Guests
                  </label>
                  <div className="flex justify-between gap-4">
                    <div className="flex w-1/2 items-center gap-4">
                      <label className="mb-1 block text-xs text-gray-500">
                        Adults
                      </label>
                      <div className="flex flex-1 items-center justify-center rounded-lg p-2 shadow">
                        <button
                          type="button"
                          onClick={() =>
                            setGuests((prev) => ({
                              ...prev,
                              adults: Math.max(1, prev.adults - 1),
                            }))
                          }
                          className="cursor-pointer rounded-full p-1 hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-4">{guests.adults}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setGuests((prev) => ({
                              ...prev,
                              adults: prev.adults + 1,
                            }))
                          }
                          className="cursor-pointer rounded-full p-1 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex w-1/2 items-center gap-4">
                      <label className="mb-1 block text-xs text-gray-500">
                        Children
                      </label>
                      <div className="flex flex-1 items-center justify-center rounded-lg p-2 shadow">
                        <button
                          type="button"
                          onClick={() =>
                            setGuests((prev) => ({
                              ...prev,
                              children: Math.max(0, prev.children - 1),
                            }))
                          }
                          className="cursor-pointer rounded-full p-1 hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="mx-4">{guests.children}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setGuests((prev) => ({
                              ...prev,
                              children: prev.children + 1,
                            }))
                          }
                          className="cursor-pointer rounded-full p-1 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* New fields section */}
                <div className="space-y-4 border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Personal Information
                  </h3>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Driving License Number *
                      </label>
                      <input
                        type="text"
                        value={drivingLicenseNumber}
                        onChange={(e) =>
                          setDrivingLicenseNumber(e.target.value)
                        }
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
                        placeholder="Enter license number"
                        required
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        License State *
                      </label>
                      <select
                        value={licenseState}
                        onChange={(e) => setLicenseState(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
                        required
                      >
                        {australianStates.map((state) => (
                          <option key={state.code} value={state.code}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none"
                      max={new Date().toISOString().split("T")[0]} // Prevent future dates
                      required
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-primary hover:bg-button w-full cursor-pointer rounded-lg py-3 font-semibold text-white transition-colors"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
