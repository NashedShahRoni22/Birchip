const EmptyState = ({ title, description, icon: Icon }) => (
  <div className="py-12 text-center">
    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-[#EDE9DA]">
      <Icon size={32} className="text-[#888888]" />
    </div>
    <h3 className="mb-2 text-lg font-medium text-[#2F2F2F]">{title}</h3>
    <p className="text-[#888888]">{description}</p>
  </div>
);

export default EmptyState;
