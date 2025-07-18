'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  const locations = [
    {
      city: 'Sydney',
      state: 'NSW',
      address: '123 Pacific Highway, Sydney NSW 2000',
      phone: '(02) 1234 5678'
    },
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com/companyname',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      href: 'https://twitter.com/companyname',
      color: 'hover:text-sky-400'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/companyname',
      color: 'hover:text-pink-400'
    }
  ];

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Motel Rooms', href: '/motel' },
    { name: 'Caravan Parks', href: '/caravan' },
    { name: 'Dining', href: '/food' },
    { name: 'Gas Station', href: '/gas' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <footer className="relative bg-black/80 text-white">
      {/* Glassmorphic overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-xl"></div>
      
      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Birchip</h3>
                <p className="text-white/80 leading-relaxed">
                  Your premier destination for comfortable accommodation, caravan parks, 
                  delicious dining, and convenient fuel services across Australia.
                </p>
              </div>
              
              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.name}
                      href={social.href}
                      className={`p-3 bg-white/20 backdrop-blur-sm rounded-full border border-white/20 text-white/80 hover:text-white transition-all duration-300 hover:bg-white/30 hover:scale-110 hover:shadow-lg`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className="w-5 h-5" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors duration-300 hover:pl-2"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-white/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80">1800 123 456</p>
                    <p className="text-white/60 text-sm">24/7 Support</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-white/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80">info@companyname.com.au</p>
                    <p className="text-white/60 text-sm">General Inquiries</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-white/60 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/80">24/7 Service</p>
                    <p className="text-white/60 text-sm">Always Open</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Australian Locations */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Our Locations</h4>
              <div className="space-y-4">
                {locations.map((location) => (
                  <div key={location.city} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-4 h-4 text-white/60 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-white">{location.city}, {location.state}</h5>
                        <p className="text-white/70 text-sm mt-1">{location.address}</p>
                        <p className="text-white/60 text-sm mt-1">{location.phone}</p>
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
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-white/60 text-sm">
                © {new Date().getFullYear()} CompanyName. All rights reserved.
              </div>
              
              <div className="flex space-x-6 text-sm">
                <Link href="/privacy" className="text-white/60 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-white/60 hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-white/60 hover:text-white transition-colors duration-300">
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