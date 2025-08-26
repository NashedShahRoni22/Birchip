"use client";
import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import SubmittedMessage from "@/component/forgot-password/SubmittedMessage";
import { usePostApi } from "@/hooks/usePostApi";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const { mutate, isPending, isSuccess } = usePostApi("/forgot-password");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
    };

    mutate(formData);
  };

  if (isSuccess) {
    return <SubmittedMessage />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Gradient orbs for background ambiance */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-purple-600 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-32 right-32 w-32 h-32 bg-pink-500 rounded-full opacity-15 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-500 rounded-full opacity-10 blur-xl"></div>

      <div className="w-full max-w-md">
        <div className=" rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-[#B63D5E] via-[#E0C3FC] rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-white" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Forgot Password?
            </h1>
            <p className="text-gray-600">
              No worries! Enter your email address and we&apos;ll send you a
              recovery link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm text-gray-700 font-semibold mb-2">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 text-gray-900 outline-none focus:border-[#B63D5E] transition-all duration-300"
                placeholder="you@example.com"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isPending}
              type="submit"
              className="w-full bg-gradient-to-r from-[#B63D5E] to-[#E0C3FC] hover:from-[#a83754] hover:to-[#d1b3f7] text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Recovery Link...
                </div>
              ) : (
                "Send Recovery Link"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/auth"
              className="text-gray-400 text-sm flex items-center justify-center gap-2 mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
        </div>

        {/* Contact info section - similar to original design */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-center gap-3 text-white">
            <div className="w-8 h-8 bg-gradient-to-r from-[#B63D5E] to-[#E0C3FC] rounded-full flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-600">contact@example.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
