"use client";
import { motion } from "framer-motion";
import authBanner from "@/public/banners/authbanner.jpg";
import Image from "next/image";

// Left Side Component - Glassmorphic Black Design
export default function WelcomePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black/95 backdrop-blur-xl lg:w-1/2"
    >
      {/* Background animated elements */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 360, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-20 h-32 w-32 rounded-full bg-gradient-to-r from-[#B63D5E]/30 to-[#E0C3FC]/30 blur-xl"
      />

      <motion.div
        animate={{
          x: [0, 25, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-20 left-1/4 h-40 w-40 rounded-full bg-gradient-to-br from-[#E0C3FC]/40 to-[#B63D5E]/20 blur-xl"
      />

      <motion.div
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-1/3 right-10 h-24 w-24 rounded-full border border-[#E0C3FC]/30 bg-gradient-to-tr from-[#B63D5E]/20 to-transparent"
      />

      {/* Main content container with glassmorphism */}
      <div className="relative z-10 mx-auto max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-lg">
        {/* Image container with modern styling */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative mb-8 overflow-hidden rounded-2xl shadow-2xl"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent"></div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={authBanner}
              alt="Welcome"
              className="h-64 w-full rounded-2xl object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Welcome text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-6 bg-gradient-to-r from-[#B63D5E] via-[#E0C3FC] to-[#B63D5E] bg-clip-text text-center text-4xl leading-tight font-bold text-transparent lg:text-5xl"
        >
          Welcome Back!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-8 text-center text-lg leading-relaxed text-gray-300"
        >
          "Log in to book motels, caravan, caravan parking, food and more - all
          from your personal dashboard. Happy travels!"
        </motion.p>

        {/* Contact info with modern design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            whileHover={{ x: 10, scale: 1.05 }}
            className="group flex cursor-pointer items-center"
          >
            <div className="mr-4 rounded-2xl border border-white/10 bg-gradient-to-r from-[#B63D5E]/20 to-[#E0C3FC]/20 p-3 backdrop-blur-sm transition-all duration-300 group-hover:from-[#B63D5E]/30 group-hover:to-[#E0C3FC]/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#E0C3FC]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-gray-300 transition-colors duration-300 group-hover:text-white">
              contact@example.com
            </span>
          </motion.div>

          <motion.div
            whileHover={{ x: 10, scale: 1.05 }}
            className="group flex cursor-pointer items-center"
          >
            <div className="mr-4 rounded-2xl border border-white/10 bg-gradient-to-r from-[#B63D5E]/20 to-[#E0C3FC]/20 p-3 backdrop-blur-sm transition-all duration-300 group-hover:from-[#B63D5E]/30 group-hover:to-[#E0C3FC]/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#E0C3FC]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <span className="text-gray-300 transition-colors duration-300 group-hover:text-white">
              +1 (555) 123-4567
            </span>
          </motion.div>
        </motion.div>

        {/* Decorative bottom element */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8 flex justify-center"
        >
          <div className="h-1 w-20 rounded-full bg-gradient-to-r from-[#B63D5E] to-[#E0C3FC]"></div>
        </motion.div>
      </div>

      {/* Additional floating elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 h-2 w-2 rounded-full bg-[#E0C3FC]"
      />

      <motion.div
        animate={{
          x: [0, 15, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-16 bottom-1/3 h-3 w-3 rounded-full bg-[#B63D5E]"
      />
    </motion.div>
  );
}
