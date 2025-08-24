"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { usePostApi } from "@/hooks/usePostApi";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const isLoginDisabled = !formData.email || !formData.password;

  // post mutation hook
  const { mutate, isPending } = usePostApi("/login");

  // handle input and checkbox change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, terms: !prev.terms }));
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        toast.success(data?.message);

        if (formData.remember) {
          localStorage.setItem("authInfo", data?.data);
        } else {
          sessionStorage.setItem("authInfo", data?.data);
        }

        setFormData({
          email: "",
          password: "",
          remember: false,
        });
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
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address <span className="text-red-400">*</span>
        </label>
        <motion.input
          whileFocus={{
            scale: 1.02,
            boxShadow: "0 0 0 3px rgba(182, 61, 94, 0.1)",
          }}
          type="email"
          className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 text-gray-900 outline-none focus:border-[#B63D5E] transition-all duration-300"
          placeholder="you@example.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Password <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <motion.input
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 0 3px rgba(182, 61, 94, 0.1)",
            }}
            type={showPassword ? "text" : "password"}
            className="w-full px-4 py-4 pr-12 rounded-xl border-2 border-gray-200 text-gray-900 outline-none focus:border-[#B63D5E] transition-all duration-300"
            placeholder="••••••••"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#B63D5E] transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-[#B63D5E] rounded border-gray-300 focus:ring-[#B63D5E]"
          />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <a
          href="#"
          className="text-sm text-[#B63D5E] hover:text-[#a83754] transition-colors"
        >
          Forgot password?
        </a>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isPending}
        className={`cursor-pointer flex items-center gap-2.5 justify-center w-full py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg
    ${
      isLoginDisabled
        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
        : "bg-gradient-to-r flex items-center gap-2.5 justify-center from-[#B63D5E] to-[#E0C3FC] hover:from-[#a83754] hover:to-[#d1b3f7] text-white"
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
