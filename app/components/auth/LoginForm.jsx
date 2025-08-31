"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { usePostApi } from "@/hooks/usePostApi";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const { setAuthInfo } = useAuth();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const isLoginDisabled = !formData.email || !formData.password;

  // redirect url if user tried to access private route
  const redirectUrl = searchParams.get("redirect");

  // post mutation hook
  const { mutate, isPending } = usePostApi("/login");

  // handle input and checkbox change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // handle login form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    mutate(loginData, {
      onSuccess: (data) => {
        if (data?.status) {
          toast.success(data?.message);
          setAuthInfo(data?.data);

          if (formData.remember) {
            localStorage.setItem("authInfo", JSON.stringify(data?.data));
            sessionStorage.removeItem("authInfo");
          } else {
            sessionStorage.setItem("authInfo", JSON.stringify(data?.data));
            localStorage.removeItem("authInfo");
          }

          if (redirectUrl) {
            router.replace(redirectUrl);
          } else {
            router.replace("/");
          }

          setFormData({
            email: "",
            password: "",
            remember: false,
          });
        }
      },
      onError: (error) => {
        console.error(error?.message || "Login failed!");
        toast.error(error?.message || "Login failed!");
      },
    });
  };

  return (
    <motion.form
      key="login"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Email Address <span className="text-red-400">*</span>
        </label>
        <motion.input
          whileFocus={{
            scale: 1.02,
            boxShadow: "0 0 0 3px rgba(182, 61, 94, 0.1)",
          }}
          type="email"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-4 text-gray-900 transition-all duration-300 outline-none focus:border-[#B63D5E]"
          placeholder="you@example.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Password <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <motion.input
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 0 3px rgba(182, 61, 94, 0.1)",
            }}
            type={showPassword ? "text" : "password"}
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-4 pr-12 text-gray-900 transition-all duration-300 outline-none focus:border-[#B63D5E]"
            placeholder="••••••••"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-gray-400 transition-colors hover:text-[#B63D5E]"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            onChange={handleChange}
            checked={formData.remember}
            name="remember"
            className="h-4 w-4 rounded border-gray-300 text-[#B63D5E] focus:ring-[#B63D5E]"
          />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-sm text-[#B63D5E] transition-colors hover:text-[#a83754]"
        >
          Forgot password?
        </Link>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isPending}
        className={`flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl py-4 font-semibold shadow-lg transition-all duration-300 ${
          isLoginDisabled
            ? "cursor-not-allowed bg-gray-400 text-gray-200"
            : "flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#B63D5E] to-[#E0C3FC] text-white hover:from-[#a83754] hover:to-[#d1b3f7]"
        }`}
      >
        Login
        {isPending && (
          <LoaderCircle size={18} className="mt-0.5 animate-spin" />
        )}
      </motion.button>
    </motion.form>
  );
}
