import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { Calendar, ChevronDown, LogOut, Settings, User } from "lucide-react";

const dropdownMenuLinks = [
  {
    Icon: User,
    label: "My Profile",
    href: "/my-profile",
  },
  {
    Icon: Calendar,
    label: "My Bookings",
    href: "/my-bookings",
  },
];

export default function NavUserProfileDropdown() {
  const { authInfo, handleLogout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef("");

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative ml-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex cursor-pointer items-center space-x-2 rounded-full border border-white/20 bg-white/20 px-4 py-2 text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/30"
      >
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#903F5C] to-[#7A3450] text-xs font-semibold text-white">
          {authInfo.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()}
        </div>
        <div className="hidden text-left md:block">
          <div className="text-sm font-medium">
            Hi, {authInfo.name.split(" ")[0]}
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-transform duration-300 ease-linear`}
        />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white py-2 shadow-lg"
        >
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="text-sm font-medium text-gray-900">{authInfo.name}</p>
            <p className="text-xs text-gray-500">{authInfo.email}</p>
          </div>

          {dropdownMenuLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleLinkClick}
              className="flex items-center px-4 py-2.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <item.Icon size={16} className="mr-3 text-gray-500" />
              {item.label}
            </Link>
          ))}

          <hr className="my-2" />

          <button
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut size={16} className="mr-3 text-red-500" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
