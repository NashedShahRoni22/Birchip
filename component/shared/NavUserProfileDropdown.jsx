import { useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { Calendar, ChevronDown, LogOut, Settings, User } from "lucide-react";

export default function NavUserProfileDropdown() {
  const { authInfo, handleLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative ml-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2.5 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/20 group"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-[#903F5C] to-[#7A3450] rounded-full flex items-center justify-center text-white font-semibold text-sm">
          {authInfo.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium">
            Hi, {authInfo.name.split(" ")[0]}
          </div>
          <div className="text-xs opacity-75">View Profile</div>
        </div>
        <ChevronDown
          size={18}
          className={`${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-transform duration-300 ease-linear`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">
              {authInfo.name}
            </p>
            <p className="text-xs text-gray-500">{authInfo.email}</p>
          </div>
          <Link
            href="/profile"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <User size={18} className="mr-3" />
            My Profile
          </Link>
          <Link
            href="/bookings"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Calendar size={18} className="mr-3" />
            My Bookings
          </Link>
          <Link
            href="/settings"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Settings size={18} className="mr-3" />
            Settings
          </Link>
          <hr className="my-2" />
          <button
            onClick={handleLogout}
            className="flex items-center cursor-pointer w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} className="mr-3" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
