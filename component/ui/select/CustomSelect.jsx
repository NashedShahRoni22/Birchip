import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function CustomSelect({
  label,
  value,
  onChange,
  options,
  icon: Icon,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="mb-1 block text-sm font-medium text-white/90">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="border-line/20 text-text focus:ring-accent/20 focus:border-accent/30 flex w-full cursor-pointer items-center justify-between rounded-xl border bg-white/90 px-4 py-3.5 text-left shadow-sm backdrop-blur-sm transition-all duration-200 hover:bg-white/95 focus:ring-2 focus:outline-none"
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="text-sm text-gray-500" />}
            <span>
              {options.find((opt) => opt.value === value)?.label || "Select..."}
            </span>
          </div>
          <ChevronDown
            className={`text-sm text-gray-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="border-line/20 absolute z-50 mt-1 w-full overflow-hidden rounded-xl border bg-white shadow-2xl backdrop-blur-md">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className="text-text flex w-full cursor-pointer items-center gap-2 px-4 py-3 text-left transition-colors duration-150 hover:bg-gray-50"
              >
                {option.icon && (
                  <option.icon className="text-sm text-gray-500" />
                )}
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
