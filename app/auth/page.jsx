"use client";
import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8EDEB] to-[#E0C3FC] px-4 py-20">
      <div className="w-full max-w-md bg-bg backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/30">
        {/* Tab Switch */}
        <div className="flex justify-center mb-8">
          <button
            className={` cursor-pointer px-6 py-2 rounded-full font-medium ${
              isLogin
                ? "bg-[#B63D5E] text-white shadow-md"
                : "text-[#B63D5E] hover:text-white hover:bg-[#B63D5E]/80 transition"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`ml-4 cursor-pointer  px-6 py-2 rounded-full font-medium ${
              !isLogin
                ? "bg-[#B63D5E] text-white shadow-md"
                : "text-[#B63D5E] hover:text-white hover:bg-[#B63D5E]/80 transition"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Form */}
        {isLogin ? (
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 outline-none focus:ring-2 ring-[#B63D5E]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 outline-none focus:ring-2 ring-[#B63D5E]"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#B63D5E] hover:bg-[#a83754] text-white py-2 rounded-lg font-semibold transition-all"
            >
              Login
            </button>
          </form>
        ) : (
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 outline-none focus:ring-2 ring-[#B63D5E]"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 outline-none focus:ring-2 ring-[#B63D5E]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 outline-none focus:ring-2 ring-[#B63D5E]"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 rounded-lg bg-white/70 text-gray-900 outline-none focus:ring-2 ring-[#B63D5E]"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#B63D5E] hover:bg-[#a83754] text-white py-2 rounded-lg font-semibold transition-all"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
