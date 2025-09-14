const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "confirmed":
      return "text-green-600 bg-green-50";
    case "pending":
      return "text-orange-600 bg-orange-50";
    case "cancelled":
      return "text-red-600 bg-red-50";
    case "expired":
      return "text-gray-600 bg-gray-50";
    default:
      return "text-gray-600 bg-gray-50";
  }
};

export default getStatusColor;
