const TabButton = ({
  id,
  label,
  count,
  icon: Icon,
  isActive,
  setActiveTab,
}) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 sm:gap-2 sm:px-6 sm:py-3 sm:text-base ${
      isActive
        ? "bg-[#603C59] text-white shadow-md"
        : "bg-white text-[#2F2F2F] hover:bg-[#EDE9DA] hover:shadow-sm"
    }`}
  >
    {/* Icon - Responsive sizing */}
    <Icon size={16} className="flex-shrink-0 sm:size-[18px]" />

    {/* Label - Hide on very small screens if needed */}
    <span className="text-xs whitespace-nowrap sm:text-sm md:text-base">
      {label}
    </span>

    {/* Count badge - Responsive */}
    {count !== undefined && count > 0 && (
      <span
        className={`ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs leading-none font-semibold transition-colors sm:h-6 sm:min-w-[24px] sm:px-2 sm:text-xs ${
          isActive ? "bg-white text-[#603C59]" : "bg-[#EDE9DA] text-[#2F2F2F]"
        }`}
      >
        {count > 99 ? "99+" : count}
      </span>
    )}
  </button>
);

export default TabButton;
