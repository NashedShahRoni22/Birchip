"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { usePostApi } from "@/hooks/usePostApi";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const { setAuthInfo } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    terms: false,
  });

  const isSignupDisabled =
    !formData.name ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPass ||
    !formData.terms ||
    formData.password !== formData.confirmPass;

  // post mutation hook
  const { mutate, isPending } = usePostApi("/register");

  // handle input and checkbox change
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, terms: !prev.terms }));
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle signup form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const signupData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPass,
    };

    mutate(signupData, {
      onSuccess: (data) => {
        toast.success(data?.message);
        setAuthInfo(data?.data);
        if (data?.status) {
          sessionStorage.setItem("authInfo", JSON.stringify(data?.data));
        }
        router.replace("/");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPass: "",
          terms: false,
        });
      },
      onError: (error) => {
        console.error(error?.message || "Signup failed!");
        toast.error(error?.message || "Signup failed!");
      },
    });
  };

  return (
    <motion.form
      key="register"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Full Name <span className="text-red-400">*</span>
        </label>
        <motion.input
          whileFocus={{
            scale: 1.02,
            boxShadow: "0 0 0 3px rgba(182, 61, 94, 0.1)",
          }}
          type="text"
          className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 text-gray-900 outline-none focus:border-[#B63D5E] transition-all duration-300"
          placeholder="John Doe"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
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
            className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#B63D5E] transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Confirm Password <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <motion.input
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 0 3px rgba(182, 61, 94, 0.1)",
            }}
            type={showConfirmPassword ? "text" : "password"}
            className="w-full px-4 py-4 pr-12 rounded-xl border-2 border-gray-200 text-gray-900 outline-none focus:border-[#B63D5E] transition-all duration-300"
            placeholder="••••••••"
            name="confirmPass"
            value={formData.confirmPass}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#B63D5E] transition-colors"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          onChange={handleChange}
          checked={formData.terms}
          required
          className="w-4 h-4 text-[#B63D5E] rounded border-gray-300 focus:ring-[#B63D5E]"
        />
        <span className="ml-2 text-sm text-gray-600">
          I agree to the{" "}
          <a href="#" className="text-[#B63D5E] hover:text-[#a83754]">
            Terms & Conditions
          </a>
        </span>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={isPending}
        className={`cursor-pointer flex items-center gap-2.5 justify-center w-full py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg
    ${
      isSignupDisabled
        ? "bg-gray-400 text-gray-200 cursor-not-allowed"
        : "bg-gradient-to-r from-[#B63D5E] to-[#E0C3FC] hover:from-[#a83754] hover:to-[#d1b3f7] text-white"
    }`}
      >
        Create Account{" "}
        {isPending && (
          <LoaderCircle size={18} className="mt-0.5 animate-spin" />
        )}
      </motion.button>
    </motion.form>
  );
}
