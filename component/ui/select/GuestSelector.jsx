import { ChevronDown, Minus, Plus, Users } from "lucide-react";
import { useState } from "react";

export default function GuestSelector({ label, onGuestChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
  });

  const updateGuests = (type, operation) => {
    const newGuests = { ...guests };
    if (operation === "increment") {
      if (type === "adults" && newGuests.adults < 8) {
        newGuests.adults += 1;
      } else if (type === "children" && newGuests.children < 6) {
        newGuests.children += 1;
      }
    } else if (operation === "decrement") {
      if (type === "adults" && newGuests.adults > 1) {
        newGuests.adults -= 1;
      } else if (type === "children" && newGuests.children > 0) {
        newGuests.children -= 1;
      }
    }
    setGuests(newGuests);
    onGuestChange(newGuests);
  };

  const totalGuests = guests.adults + guests.children;

  return (
    <div className="relative">
      <label className="mb-1 block text-sm font-medium text-white/90">
        {label}
      </label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="border-line/20 text-text focus:ring-accent/20 focus:border-accent/30 flex w-full cursor-pointer items-center justify-between rounded-xl border bg-white/90 px-4 py-3.5 text-left shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/95 focus:ring-2 focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <Users className="text-sm text-gray-500" />
          <span>
            {totalGuests} Guest{totalGuests !== 1 ? "s" : ""}
          </span>
        </div>
        <ChevronDown
          className={`text-sm text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-line/20 absolute z-50 mt-1 w-full overflow-hidden rounded-xl border bg-white p-4 shadow-2xl backdrop-blur-md">
          <div className="space-y-4">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text font-medium">Adults</p>
              </div>
              <div className="flex w-1/2 items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateGuests("adults", "decrement")}
                  disabled={guests.adults <= 1}
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Minus className="text-xs text-gray-600" />
                </button>
                <span className="text-text w-8 text-center font-medium">
                  {guests.adults}
                </span>
                <button
                  type="button"
                  onClick={() => updateGuests("adults", "increment")}
                  disabled={guests.adults >= 8}
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus className="text-xs text-gray-600" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text font-medium">Children</p>
              </div>
              <div className="flex w-1/2 items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateGuests("children", "decrement")}
                  disabled={guests.children <= 0}
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Minus className="text-xs text-gray-600" />
                </button>
                <span className="text-text w-8 text-center font-medium">
                  {guests.children}
                </span>
                <button
                  type="button"
                  onClick={() => updateGuests("children", "increment")}
                  disabled={guests.children >= 6}
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Plus className="text-xs text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-button hover:bg-button/90 cursor-pointer rounded-full px-6 py-2 text-sm text-white transition-colors duration-200"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
