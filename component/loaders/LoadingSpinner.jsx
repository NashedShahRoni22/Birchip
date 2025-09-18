export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="border-primary mb-4 h-12 w-12 animate-spin rounded-full border-b-2"></div>
      <p className="font-medium text-gray-600">{message}</p>
    </div>
  );
}
