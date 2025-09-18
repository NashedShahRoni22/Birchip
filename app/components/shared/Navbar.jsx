"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, LogOut, Menu, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import logo1 from "../../../public/images/logo/logo-1.svg";
import logo2 from "../../../public/images/logo/logo-2.svg";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import NavUserProfileDropdown from "@/component/shared/NavUserProfileDropdown";

export default function Navbar() {
  const { authInfo, handleLogout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Motels", href: "/motels" },
    { name: "Caravans", href: "/caravans" },
    { name: "Foods", href: "/foods" },
    { name: "Gas Stations", href: "/gas-stations" },
  ];

  const clickLogout = () => {
    handleLogout();
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        pathname === "/"
          ? scrolled
            ? "border-b border-white/20 bg-black/30 shadow backdrop-blur-xl"
            : "bg-transparent"
          : "sticky border-b border-white/20 bg-black/80 shadow backdrop-blur-xl"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-1.5">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link
            href="/"
            className="text-2xl font-bold text-white transition-all duration-300 hover:text-white/90"
          >
            {scrolled ? (
              <Image
                src={logo1}
                alt="Birchip Motel & Caravan Park"
                width={200}
                height={60}
                priority
              />
            ) : (
              <Image
                src={logo2}
                alt="Birchip Motel & Caravan Park"
                width={200}
                height={60}
                priority
              />
            )}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center space-x-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-sm font-medium transition-all duration-300 ${
                  pathname === link.href
                    ? "text-white"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full ${
                    pathname === link.href ? "w-full" : ""
                  }`}
                ></span>
              </Link>
            ))}

            {authInfo?.name ? (
              <NavUserProfileDropdown authInfo={authInfo} />
            ) : (
              <Link
                href="/auth"
                className="hover:bg-button ml-4 transform rounded-full border border-white/20 bg-white/20 px-6 py-2.5 text-white shadow backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative p-2 text-white/80 transition-colors duration-300 hover:text-white focus:outline-none"
            >
              <div className="relative h-6 w-6">
                <Menu
                  className={`absolute h-6 w-6 transition-all duration-300 ${
                    mobileMenuOpen
                      ? "rotate-90 opacity-0"
                      : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`absolute h-6 w-6 transition-all duration-300 ${
                    mobileMenuOpen
                      ? "rotate-0 opacity-100"
                      : "-rotate-90 opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-4 border-t border-white/20 bg-black/30 px-6 py-4 backdrop-blur-xl">
          {authInfo && (
            <div className="mb-4 border-b border-white/20 pb-4">
              {/* User Info Display */}
              <div className="mb-4 flex items-center space-x-3 px-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#903F5C] to-[#7A3450] font-semibold text-white">
                  {authInfo.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    {authInfo.name}
                  </p>
                  <p className="text-xs text-white/70">{authInfo.email}</p>
                </div>
              </div>

              {/* User Actions */}
              <div className="space-y-2">
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 py-3 text-white/80 transition-all duration-300 hover:pl-4 hover:text-white"
                >
                  <User size={20} />
                  <span>My Profile</span>
                </Link>

                <Link
                  href="/my-bookings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-3 py-3 text-white/80 transition-all duration-300 hover:pl-4 hover:text-white"
                >
                  <Calendar size={20} />
                  <span>My Bookings</span>
                </Link>

                <button
                  onClick={clickLogout}
                  className="flex w-full items-center space-x-3 py-3 text-red-400 transition-all duration-300 hover:pl-4 hover:text-red-300"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-3 text-base font-medium transition-all duration-300 ${
                pathname === link.href
                  ? "border-l-4 border-white pl-4 text-white"
                  : "text-white/80 hover:pl-4 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {!authInfo && (
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:bg-button mt-4 block transform rounded-full border border-white/20 bg-white/20 px-6 py-3 text-center text-white shadow backdrop-blur-sm transition-all duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
