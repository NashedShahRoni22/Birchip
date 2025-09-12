import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function SubmittedMessage({ email }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Gradient orbs for background ambiance */}
      <div className="absolute top-20 left-20 h-40 w-40 rounded-full bg-purple-600 opacity-20 blur-3xl"></div>
      <div className="absolute right-32 bottom-32 h-32 w-32 rounded-full bg-pink-500 opacity-15 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 h-24 w-24 rounded-full bg-blue-500 opacity-10 blur-xl"></div>

      <div className="w-full max-w-md">
        <div className="rounded-2xl p-8 shadow-2xl">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>

            <h1 className="mb-4 text-2xl font-bold text-gray-900">
              Check Your Email
            </h1>

            <p className="mb-6 leading-relaxed text-gray-600">
              We've sent a password recovery link to your email address. Please
              check your inbox and follow the instructions to reset your
              password.
            </p>

            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-100 p-4">
              <p className="text-sm text-gray-500">
                Email sent to:{" "}
                <span className="font-medium text-gray-700">{email}</span>
              </p>
            </div>

            <p className="mb-6 text-sm text-gray-500">
              Didn't receive the email? Check your spam folder or try again in a
              few minutes.
            </p>

            <Link
              href="/auth"
              className="flex w-full transform cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#B63D5E] to-[#E0C3FC] px-4 py-3 font-semibold text-white transition-all duration-200 hover:from-[#a83754] hover:to-[#d1b3f7] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
