import { calculateDiscount } from "@/utils/calculateDiscount";

export default function PriceBreakdown({ itemDetails, bookingData, nights }) {
  const totalPrice =
    calculateDiscount(
      itemDetails.discount_type,
      itemDetails.price,
      itemDetails.discount,
    ) * nights;
  const serviceFee = 0;
  const finalTotal = totalPrice + serviceFee;

  return (
    <div className="mb-8 rounded-xl border border-gray-200 p-4">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Price Details
      </h3>

      <div className="space-y-4 text-sm">
        {/* Accommodation costs */}
        <div className="space-y-2">
          {/* Original price (always show if discount) */}
          {itemDetails.discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-900">
                ${itemDetails.price} × {nights} night
                {nights > 1 ? "s" : ""}
              </span>
              <span className="text-gray-900">
                ${(itemDetails.price * nights).toFixed(2)}
              </span>
            </div>
          )}

          {/* Discount (show before discounted price) */}
          {itemDetails.discount > 0 && (
            <div className="flex justify-between text-sm text-green-600">
              <span>
                {itemDetails.discount_type === "percentage"
                  ? `Discount (${itemDetails.discount}% off)`
                  : "Weekly discount"}
              </span>
              <span>
                -$
                {(
                  (itemDetails.price -
                    calculateDiscount(
                      itemDetails.discount_type,
                      itemDetails.price,
                      itemDetails.discount,
                    )) *
                  nights
                ).toFixed(2)}
              </span>
            </div>
          )}

          {/* Final accommodation price */}
          <div className="flex justify-between text-sm">
            <span className="font-medium text-gray-900">
              Accommodation total
            </span>
            <span className="font-medium text-gray-900">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Service fee */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-900">Service fee</span>
          <span className="text-gray-900">${serviceFee.toFixed(2)}</span>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200"></div>

        {/* Total */}
        <div className="flex justify-between text-base font-semibold">
          <span className="text-gray-900">Total to Pay</span>
          <span className="text-gray-900">${finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
