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
    return <SubmittedMessage email={email} />;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
      {/* Gradient orbs for background ambiance */}
      <div className="absolute top-20 left-20 h-40 w-40 rounded-full bg-purple-600 opacity-20 blur-3xl"></div>
      <div className="absolute right-32 bottom-32 h-32 w-32 rounded-full bg-pink-500 opacity-15 blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 h-24 w-24 rounded-full bg-blue-500 opacity-10 blur-xl"></div>

      <div className="w-full max-w-md">
        <div className="rounded-2xl p-8 shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#B63D5E] via-[#E0C3FC]">
              <Mail className="h-8 w-8 text-white" />
            </div>

            <h1 className="mb-2 text-2xl font-bold text-gray-900">
              Forgot Password?
            </h1>
            <p className="text-gray-600">
              No worries! Enter your email address and we&apos;ll send you a
              recovery link.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-4 text-gray-900 transition-all duration-300 outline-none focus:border-[#B63D5E]"
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
              className="w-full transform cursor-pointer rounded-lg bg-gradient-to-r from-[#B63D5E] to-[#E0C3FC] px-4 py-3 font-semibold text-white transition-all duration-200 hover:from-[#a83754] hover:to-[#d1b3f7] active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
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
              className="mx-auto flex items-center justify-center gap-2 text-sm text-gray-400"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Login
            </Link>
          </div>
        </div>

        {/* Contact info section - similar to original design */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-center gap-3 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#B63D5E] to-[#E0C3FC]">
              <Mail className="h-4 w-4" />
            </div>
            <span className="text-sm text-gray-600">contact@example.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
