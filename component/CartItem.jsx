import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";

export default function CartItem({
  item,
  handleRemoveItem,
  handleQuantityChange,
  isSubmitting,
}) {
  return (
    <motion.div
      key={item.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-2xl bg-gray-50 p-4"
    >
      <div className="flex items-start gap-3">
        {/* Item Image */}
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-white">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Item Details */}
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="line-clamp-1 text-sm font-semibold text-gray-900">
              {item.title}
            </h3>
            <button
              onClick={() => handleRemoveItem(item.id)}
              className="ml-2 cursor-pointer rounded-lg p-1 text-red-500 transition-colors hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="text-primary font-semibold">
                $
                {Number.isInteger(item.actualPrice)
                  ? item.actualPrice
                  : item.actualPrice.toFixed(2)}
              </span>
              {item.price !== item.actualPrice && (
                <span className="ml-1 text-gray-500 line-through">
                  $
                  {Number.isInteger(item.price)
                    ? item.price
                    : item.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(item.id, -1)}
                disabled={item.quantity <= 1 || isSubmitting}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Minus className="h-3 w-3 text-gray-600" />
              </button>
              <span className="w-8 text-center font-semibold text-gray-900">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.id, 1)}
                disabled={isSubmitting}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-200 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="h-3 w-3 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
