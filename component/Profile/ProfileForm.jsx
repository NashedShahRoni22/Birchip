"use client";
import { useState, useEffect } from "react";
import { Save, User, Mail, Phone, MapPin, ImagePlus } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";

export default function ProfileForm() {
  const { authInfo } = useAuth();
  console.log(authInfo);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Initialize form data when authInfo is available
  useEffect(() => {
    if (authInfo) {
      setFormData({
        name: authInfo.name || "",
        email: authInfo.email || "",
        phone: authInfo.phone || "",
        address: authInfo.address || "",
      });
    }
  }, [authInfo]);

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("/api/placeholder/150/150");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Profile updated:", formData);
      console.log("Profile image:", profileImage);
      setIsLoading(false);
      // Show success message
    }, 2000);
  };

  const handleReset = () => {
    // Reset to original authInfo values
    if (authInfo) {
      setFormData({
        name: authInfo.name || "",
        email: authInfo.email || "",
        phone: authInfo.phone || "",
        address: authInfo.address || "",
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-line/20 overflow-hidden">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-primary to-button p-8 text-white text-center">
        <div className="relative inline-block">
          <div className="w-32 relative h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
            <Image
              src={imagePreview ? imagePreview : authInfo?.avatar}
              alt="Profile"
              fill
              className="w-full h-full object-cover"
            />
          </div>
          <label className="absolute -bottom-1 -right-1 w-12 h-12 bg-accent rounded-full flex items-center justify-center cursor-pointer hover:bg-accent/80 transition-all duration-300 shadow-lg border-2 border-white">
            <div className="relative">
              <ImagePlus size={18} className="text-white" />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>
        <h2 className="text-2xl font-bold mt-4">{authInfo?.name}</h2>
        <p className="text-white/80">{authInfo?.email}</p>
      </div>

      {/* Profile Form */}
      <div className="p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <User size={16} className="inline mr-2" />
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 text-gray-900 outline-none focus:border-[#B63D5E] focus:scale-[1.02] transition-all duration-300"
                placeholder="Enter your full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail size={16} className="inline mr-2" />
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 text-gray-900 outline-none focus:border-[#B63D5E] focus:scale-[1.02] transition-all duration-300"
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Phone size={16} className="inline mr-2" />
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 text-gray-900 outline-none focus:border-[#B63D5E] focus:scale-[1.02] transition-all duration-300"
                placeholder="+1 (555) 123-4567"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin size={16} className="inline mr-2" />
                Address
              </label>
              <input
                type="text"
                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 text-gray-900 outline-none focus:border-[#B63D5E] focus:scale-[1.02] transition-all duration-300"
                placeholder="Enter your address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary to-button text-white hover:shadow-lg transform"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Updating...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Changes
                </>
              )}
            </button>
            <button
              type="button"
              className="flex-1 sm:flex-none px-8 py-4 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:border-primary hover:text-primary transition-all duration-300"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
