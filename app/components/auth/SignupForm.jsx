"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { usePostApi } from "@/hooks/usePostApi";

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
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Full Name <span className="text-red-400">*</span>
        </label>
        <motion.input
          whileFocus={{
            scale: 1.02,
            boxShadow: "0 0 0 3px rgba(182, 61, 94, 0.1)",
          }}
          type="text"
          className="w-full rounded-xl border-2 border-gray-200 px-4 py-4 text-gray-900 transition-all duration-300 outline-none focus:border-[#B63D5E]"
          placeholder="John Doe"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
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
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Confirm Password <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <motion.input
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 0 3px rgba(182, 61, 94, 0.1)",
            }}
            type={showConfirmPassword ? "text" : "password"}
            className="w-full rounded-xl border-2 border-gray-200 px-4 py-4 pr-12 text-gray-900 transition-all duration-300 outline-none focus:border-[#B63D5E]"
            placeholder="••••••••"
            name="confirmPass"
            value={formData.confirmPass}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-gray-400 transition-colors hover:text-[#B63D5E]"
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
          className="accent-primary h-4 w-4 rounded"
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
        className={`flex w-full items-center justify-center gap-2.5 rounded-xl py-4 font-semibold shadow-lg transition-all duration-300 ${
          isSignupDisabled
            ? "from-primary/75 to-button/75 cursor-not-allowed bg-gradient-to-r text-gray-200"
            : "from-primary to-button flex cursor-pointer items-center justify-center gap-2.5 bg-gradient-to-r text-white"
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
