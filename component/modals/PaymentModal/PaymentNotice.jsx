import { Clock, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function PaymentNotice() {
  return (
    <div className="mt-6 rounded-lg border border-orange-200 bg-orange-50 p-4">
      <div className="flex items-start gap-3">
        <Clock className="mt-0.5 h-5 w-5 text-orange-600" />
        <div className="flex-1">
          <h4 className="mb-2 font-medium text-orange-900">
            Complete Payment Within 30 Minutes
          </h4>
          <p className="mb-3 text-sm text-orange-800">
            After reserving, you'll need to complete payment to confirm your
            booking. Your reservation will automatically cancel if payment isn't
            made within 30 minutes.
          </p>
          <Link
            href="/my-bookings"
            className="inline-flex items-center gap-2 text-sm font-medium text-orange-900 underline hover:text-orange-700"
          >
            Go to My Bookings
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
