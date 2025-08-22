"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePostApi } from "@/hooks/usePostApi";

// Right Side Component - Clean White Design
export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const {
    mutate: loginMutation,
    isPending,
    error,
  } = usePostApi("/login", {
    onSuccess: (data) => {
      console.log("Login successful:", data);

      // Store token and user data
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user_data", JSON.stringify(data));

      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const {
    mutate: registerMutation,
    isPending: isRegisterPending,
    error: registerError,
  } = usePostApi("/register", {
    onSuccess: (data) => {
      console.log("Registration successful:", data);

      // Store token and user data
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("user_data", JSON.stringify(data));
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    loginMutation(loginData);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    // Optionally validate before submit
    if (formData.password !== formData.confirmPass) {
      alert("Passwords do not match");
      return;
    }

    const registerData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.confirmPass, // Laravel expects this
    };

    registerMutation(registerData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full lg:w-1/2 flex items-center justify-center bg-white min-h-screen"
    >
      <div className="w-full max-w-md p-12">
        {/* Floating elements for subtle animation */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-10 w-4 h-4 rounded-full bg-[#B63D5E]/30"
        />

        <motion.div
          animate={{
            x: [0, 20, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-32 right-20 w-6 h-6 rounded-full bg-[#E0C3FC]/40"
        />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.h2 className="text-3xl font-bold text-gray-900 mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </motion.h2>
          <p className="text-gray-600">
            {isLogin ? "Sign in to your account" : "Join our community today"}
          </p>
        </motion.div>

        {/* Tab Switch with Modern Design */}
        <div className="flex justify-center mb-8 bg-gray-100 rounded-2xl p-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
              isLogin
                ? "bg-white text-[#B63D5E] shadow-lg shadow-gray-200/50"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer ${
              !isLogin
                ? "bg-white text-[#B63D5E] shadow-lg shadow-gray-200/50"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </motion.button>
        </div>

        {/* Form */}
        {isLogin ? (
          <motion.form
            key="login"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
            onSubmit={handleLoginSubmit}
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
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
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#B63D5E] transition-colors cursor-pointer"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
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
              className="cursor-pointer w-full bg-gradient-to-r from-[#B63D5E] to-[#E0C3FC] hover:from-[#a83754] hover:to-[#d1b3f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg"
            >
              Sign In
            </motion.button>
          </motion.form>
        ) : (
          <motion.form
            key="register"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
            onSubmit={handleRegisterSubmit}
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
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
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
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
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#B63D5E] transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
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
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="cursor-pointer absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#B63D5E] transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
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
              className="cursor-pointer w-full bg-gradient-to-r from-[#B63D5E] to-[#E0C3FC] hover:from-[#a83754] hover:to-[#d1b3f7] text-white py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg"
            >
              Create Account
            </motion.button>
          </motion.form>
        )}

        {/* Social Login */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8"
        >
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full inline-flex justify-center py-3 px-4 rounded-xl border-2 border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="ml-2">Google</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full inline-flex justify-center py-3 px-4 rounded-xl border-2 border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="ml-2">Facebook</span>
            </motion.button>
          </div>
        </motion.div> */}
      </div>
    </motion.div>
  );
}
