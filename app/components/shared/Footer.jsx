"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";

export default function Footer() {
  const locations = [
    {
      city: "Sydney",
      state: "NSW",
      address: "123 Pacific Highway, Sydney NSW 2000",
      phone: "(02) 1234 5678",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/companyname",
      color: "hover:text-blue-400",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/companyname",
      color: "hover:text-sky-400",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/companyname",
      color: "hover:text-pink-400",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Motel Rooms", href: "/motels" },
    { name: "Caravan Parks", href: "/caravans" },
    { name: "Foods", href: "/foods" },
    { name: "Gas Station", href: "/gas-stations" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative bg-black/80 text-white">
      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xl"></div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-2xl font-bold text-white">Birchip</h3>
                <p className="leading-relaxed text-white/80">
                  Your premier destination for comfortable accommodation,
                  caravan parks, delicious dining, and convenient fuel services
                  across Australia.
                </p>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="mb-4 text-lg font-semibold">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className={`rounded-full border border-white/20 bg-white/20 p-3 text-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30 hover:text-white hover:shadow`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className="h-5 w-5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-6 text-lg font-semibold">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/80 transition-colors duration-300 hover:pl-2 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="mb-6 text-lg font-semibold">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-white/60" />
                  <div>
                    <p className="text-white/80">1800 123 456</p>
                    <p className="text-sm text-white/60">24/7 Support</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-white/60" />
                  <div>
                    <p className="text-white/80">info@companyname.com.au</p>
                    <p className="text-sm text-white/60">General Inquiries</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="mt-0.5 h-5 w-5 flex-shrink-0 text-white/60" />
                  <div>
                    <p className="text-white/80">24/7 Service</p>
                    <p className="text-sm text-white/60">Always Open</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Australian Locations */}
            <div>
              <h4 className="mb-6 text-lg font-semibold">Our Locations</h4>
              <div className="space-y-4">
                {locations.map((location) => (
                  <div
                    key={location.city}
                    className="rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                  >
                    <div className="flex items-start space-x-3">
                      <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-white/60" />
                      <div>
                        <h5 className="font-medium text-white">
                          {location.city}, {location.state}
                        </h5>
                        <p className="mt-1 text-sm text-white/70">
                          {location.address}
                        </p>
                        <p className="mt-1 text-sm text-white/60">
                          {location.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 bg-black/30 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-6">
            <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
              <div className="text-sm text-white/60">
                © {new Date().getFullYear()} CompanyName. All rights reserved.
              </div>

              <div className="flex space-x-6 text-sm">
                <Link
                  href="/privacy"
                  className="text-white/60 transition-colors duration-300 hover:text-white"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/terms"
                  className="text-white/60 transition-colors duration-300 hover:text-white"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/cookies"
                  className="text-white/60 transition-colors duration-300 hover:text-white"
                >
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
