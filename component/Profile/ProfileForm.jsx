"use client";
import { useState, useEffect } from "react";
import {
  Save,
  User,
  Mail,
  Phone,
  MapPin,
  ImagePlus,
  LoaderCircle,
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import Image from "next/image";
import usePutMutation from "@/hooks/mutations/usePutMutation";

export default function ProfileForm() {
  const { authInfo } = useAuth();

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

  const { mutate, isPending } = usePutMutation({
    endPoint: "/profile",
    token: true,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("email", formData.email);
    payload.append("phone", formData.phone);
    payload.append("address", formData.address);
    if (profileImage) {
      payload.append("avatar", profileImage);
    }

    mutate(payload, {
      onSuccess: (data) => {
        toast.success(data?.message || "Profile updated successfully!");
      },
      onError: (err) => {
        toast.error(err?.message || "Failed to update profile");
        console.error(err);
      },
    });
  };

  return (
    <div className="border-line/20 overflow-hidden rounded-2xl border bg-white shadow-lg">
      {/* Profile Header */}
      <div className="from-primary to-button bg-gradient-to-r p-8 text-center text-white">
        <div className="relative inline-block">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
            <Image
              src={imagePreview ? imagePreview : authInfo?.avatar}
              alt="Profile"
              fill
              className="h-full w-full object-cover"
            />
          </div>
          <label className="bg-accent hover:bg-accent/80 absolute -right-1 -bottom-1 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-white shadow-lg transition-all duration-300">
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
        <h2 className="mt-4 text-2xl font-bold">{authInfo?.name}</h2>
        <p className="text-white/80">{authInfo?.email}</p>
      </div>

      {/* Profile Form */}
      <div className="p-8">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                <User size={16} className="mr-2 inline" />
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-4 text-gray-900 transition-all duration-300 outline-none focus:scale-[1.02] focus:border-[#B63D5E]"
                placeholder="Enter your full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                <Mail size={16} className="mr-2 inline" />
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-4 text-gray-900 transition-all duration-300 outline-none focus:scale-[1.02] focus:border-[#B63D5E]"
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                <Phone size={16} className="mr-2 inline" />
                Phone Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-4 text-gray-900 transition-all duration-300 outline-none focus:scale-[1.02] focus:border-[#B63D5E]"
                placeholder="+1 (555) 123-4567"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Address Field */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                <MapPin size={16} className="mr-2 inline" />
                Address
              </label>
              <input
                type="text"
                className="w-full rounded-xl border-2 border-gray-200 px-4 py-4 text-gray-900 transition-all duration-300 outline-none focus:scale-[1.02] focus:border-[#B63D5E]"
                placeholder="Enter your address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              disabled={isPending}
              className={`flex flex-1 items-center justify-center gap-2.5 rounded-xl px-8 py-4 font-semibold transition-all duration-300 ${
                isPending
                  ? "cursor-not-allowed bg-gray-400 text-gray-200"
                  : "from-primary to-button transform bg-gradient-to-r text-white hover:shadow-lg"
              }`}
            >
              <Save size={20} />
              Save Changes
              {isPending && (
                <LoaderCircle size={18} className="mt-0.5 animate-spin" />
              )}
            </button>
            <button
              type="button"
              className="hover:border-primary hover:text-primary flex-1 rounded-xl border-2 border-gray-300 px-8 py-4 font-semibold text-gray-600 transition-all duration-300 sm:flex-none"
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
