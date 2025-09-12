import { useState, useEffect } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateRangePickerDropdown({
  onDateChange,
  dateRange: initialRange,
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [range, setRange] = useState(
    initialRange || [
      {
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        key: "selection",
      },
    ],
  );

  useEffect(() => {
    if (initialRange) {
      setRange(initialRange);
    }
  }, [initialRange]);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleRangeChange = (item) => {
    const newRange = [item.selection];
    setRange(newRange);
    if (onDateChange) {
      onDateChange(newRange);
    }
  };

  return (
    <div className="relative">
      <label className="mb-1 block text-sm font-medium text-white/90">
        Check-in - Check-out
      </label>
      <button
        type="button"
        onClick={() => setShowPicker(!showPicker)}
        className="border-line/20 text-text focus:ring-accent/20 focus:border-accent/30 flex w-full cursor-pointer items-center justify-between rounded-xl border bg-white/90 px-4 py-3.5 text-left shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/95 focus:ring-2 focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <Calendar className="text-sm text-gray-500" />
          <span className="flex items-center gap-2">
            <span>{formatDate(range[0].startDate)}</span>
            <span className="text-gray-400">-</span>
            <span>{formatDate(range[0].endDate)}</span>
          </span>
        </div>
        <ChevronDown
          className={`text-sm text-gray-400 transition-transform duration-200 ${
            showPicker ? "rotate-180" : ""
          }`}
        />
      </button>

      {showPicker && (
        <div className="border-line/20 absolute right-0 left-0 z-50 mt-2 overflow-hidden rounded-2xl border bg-white p-4 shadow-2xl backdrop-blur-md sm:right-auto sm:left-auto sm:w-auto">
          <div className="hidden lg:block">
            <DateRange
              editableDateInputs
              onChange={handleRangeChange}
              moveRangeOnFirstSelection={false}
              ranges={range}
              rangeColors={["#B63D5E"]}
              months={2}
              direction="horizontal"
              minDate={new Date()}
              showMonthAndYearPickers={false}
            />
          </div>
          <div className="flex justify-center lg:hidden">
            <DateRange
              editableDateInputs
              onChange={handleRangeChange}
              moveRangeOnFirstSelection={false}
              ranges={range}
              rangeColors={["#7BA693"]}
              months={1}
              direction="vertical"
              minDate={new Date()}
              showMonthAndYearPickers={false}
            />
          </div>
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={() => setShowPicker(!showPicker)}
              className="bg-button hover:bg-button/90 cursor-pointer rounded-full px-4 py-1.5 text-xs text-white transition-colors duration-200 md:px-6 md:py-2 md:text-sm"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
