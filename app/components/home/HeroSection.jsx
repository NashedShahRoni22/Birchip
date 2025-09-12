"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Hotel, Truck } from "lucide-react";
import CustomSelect from "@/component/ui/select/CustomSelect";
import GuestSelector from "@/component/ui/select/GuestSelector";
import DateRangePickerDropdown from "@/component/ui/dropdown/DateRangePickerDropdown";
import banner1 from "@/public/banners/banner (1).jpg";
import banner2 from "@/public/banners/banner (2).jpg";
import banner3 from "@/public/banners/banner (3).jpg";
import "swiper/css";
import "swiper/css/autoplay";

export default function HeroSection() {
  const router = useRouter();
  const sliderBanners = [banner1, banner2, banner3];
  const [accommodationType, setAccommodationType] = useState("room");
  const [guestData, setGuestData] = useState({ adults: 1, children: 0 });
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      key: "selection",
    },
  ]);

  const accommodationOptions = [
    { value: "room", label: "Room", icon: Hotel },
    { value: "caravan", label: "Caravan", icon: Truck },
  ];

  const handleGuestChange = (guests) => {
    setGuestData(guests);
  };

  const handleDateChange = (range) => {
    setDateRange(range);
  };

  const formatDateForAPI = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}-${month}-${year}`;
  };

  const handleSearch = () => {
    const totalGuests = guestData.adults + guestData.children;
    const checkinDate = formatDateForAPI(dateRange[0].startDate);
    const checkoutDate = formatDateForAPI(dateRange[0].endDate);
    const accommodationEndpoint =
      accommodationType === "room" ? "motels" : "caravans";

    // Construct the search URL with query parameters
    const searchParams = new URLSearchParams({
      guests: totalGuests.toString(),
      checkin: checkinDate,
      checkout: checkoutDate,
      type: accommodationType,
    });

    // Redirect to search page with parameters
    router.push(`/search/${accommodationEndpoint}?${searchParams.toString()}`);
  };

  return (
    <section className="relative h-[90vh]">
      {/* Swiper Background */}
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="absolute inset-0 z-0"
      >
        {sliderBanners.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[90vh] w-full">
              <Image
                src={img}
                alt={`Banner ${index + 1}`}
                fill
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Content */}
      <div className="absolute top-0 z-20 flex h-full w-full items-center justify-center px-[24px]">
        <div className="relative w-full max-w-4xl">
          <div className="mb-8 hidden text-center md:block">
            <h1 className="text-[32px] font-bold text-white md:text-[44px]">
              Your All-in-One Motel, Caravan & Dining Experience
            </h1>
            <p className="text-md mt-2 text-white/80">
              Book rooms, caravan spots, meals & view gas prices
            </p>
          </div>

          {/* Glass Search Card */}
          <div className="space-y-[24px] rounded-2xl border border-white/20 bg-white/10 p-[32px] shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-1 items-end gap-[16px] md:grid-cols-4">
              {/* Accommodation Type */}
              <div>
                <CustomSelect
                  label="Accommodation"
                  value={accommodationType}
                  onChange={setAccommodationType}
                  options={accommodationOptions}
                />
              </div>

              {/* Date Range */}
              <div className="md:col-span-2">
                <DateRangePickerDropdown
                  onDateChange={handleDateChange}
                  dateRange={dateRange}
                />
              </div>

              {/* Guests */}
              <div>
                <GuestSelector
                  label="Guests"
                  onGuestChange={handleGuestChange}
                />
              </div>

              {/* Button */}
              <div className="md:col-span-4">
                <button
                  type="button"
                  onClick={handleSearch}
                  className="bg-button hover:bg-button/80 mt-4 w-full transform cursor-pointer rounded-xl px-4 py-3 font-semibold text-white shadow transition-all duration-300"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
