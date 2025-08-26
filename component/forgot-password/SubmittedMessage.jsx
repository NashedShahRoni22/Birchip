import Link from "next/link";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function SubmittedMessage() {
  const email = "roufadask@gmail.com";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Gradient orbs for background ambiance */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-32 right-32 w-32 h-32 bg-pink-500 rounded-full opacity-15 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500 rounded-full opacity-10 blur-xl"></div>

      <div className="w-full max-w-md">
        <div className=" rounded-2xl p-8 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Check Your Email
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              We've sent a password recovery link to your email address. Please
              check your inbox and follow the instructions to reset your
              password.
            </p>

            <div className="bg-gray-100 rounded-lg p-4 mb-6 border border-gray-200">
              <p className="text-sm text-gray-500">
                Email sent to:{" "}
                <span className="text-gray-700 font-medium">{email}</span>
              </p>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              Didn't receive the email? Check your spam folder or try again in a
              few minutes.
            </p>

            <Link
              href="/auth"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#B63D5E] to-[#E0C3FC] hover:from-[#a83754] hover:to-[#d1b3f7] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform cursor-pointer active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
