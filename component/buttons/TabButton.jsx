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
    className={`flex cursor-pointer items-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors ${
      isActive
        ? "bg-[#603C59] text-white"
        : "bg-white text-[#2F2F2F] hover:bg-[#EDE9DA]"
    }`}
  >
    <Icon size={18} />
    {label}
    {count !== undefined && count > 0 && (
      <span
        className={`rounded-full px-2 py-1 text-xs ${
          isActive ? "bg-white text-[#603C59]" : "bg-[#EDE9DA] text-[#2F2F2F]"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

export default TabButton;
