'use client';

import Image from 'next/image';
import banner1 from "@/public/banners/banner (1).jpg";
import banner2 from "@/public/banners/banner (2).jpg";
import banner3 from "@/public/banners/banner (3).jpg";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function DateRangePickerDropdown() {
    const [showPicker, setShowPicker] = useState(false);
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            key: 'selection',
        },
    ]);

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setShowPicker(!showPicker)}
                className="w-full border border-line/20 rounded-xl px-4 py-3.5 text-left text-text bg-white/90 backdrop-blur-sm hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all duration-200 shadow-sm"
            >
                {`${range[0].startDate.toLocaleDateString()} - ${range[0].endDate.toLocaleDateString()}`}
            </button>
            {showPicker && (
                <div className="absolute z-50 mt-2 bg-white/95 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-line/20 left-0 right-0 sm:left-auto sm:right-auto sm:w-auto">
                    <div className="hidden lg:block">
                        <DateRange
                            editableDateInputs
                            onChange={(item) => setRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                            rangeColors={["#7BA693"]}
                            months={2}
                            direction="horizontal"
                            showMonthAndYearPickers={false}
                        />
                    </div>
                    <div className="flex justify-center lg:hidden">
                        <DateRange
                            editableDateInputs
                            onChange={(item) => setRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                            rangeColors={["#7BA693"]}
                            months={1}
                            direction="vertical"
                            showMonthAndYearPickers={false}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default function HeroSection() {
    return (
        <section className="relative h-[90vh]">
            {/* Swiper Background */}
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="absolute inset-0 z-0"
            >
                {[banner1, banner2, banner3].map((img, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-[90vh]">
                            <Image
                                src={img}
                                alt={`Banner ${index + 1}`}
                                fill
                                className="object-cover w-full h-full"
                                priority
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/80 z-10" />

            {/* Content */}
            <div className="absolute top-0 z-20 h-full w-full flex items-center justify-center px-[24px]">
                <div className="relative max-w-4xl w-full">
                    <div className="text-center mb-8 hidden md:block">
                        <h1 className="text-[32px] md:text-[44px] font-bold text-white">
                            Your All-in-One Motel, Caravan & Dining Experience
                        </h1>
                        <p className="text-md text-white/80 mt-2">
                            Book rooms, caravan spots, meals & view gas prices
                        </p>
                    </div>

                    {/* Glass Search Card */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-[32px] space-y-[24px] border border-white/20">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-[16px] items-end">
                            {/* Accommodation Type */}
                            <div>
                                <label className="block mb-1 font-medium text-sm text-white/90">Accommodation</label>
                                <select className="w-full border border-line/20 rounded-xl px-3 py-2 text-text focus:outline-none bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-200 shadow-sm">
                                    <option>Room</option>
                                    <option>Caravan</option>
                                </select>
                            </div>

                            {/* Date Range */}
                            <div className="md:col-span-2">
                                <label className="block mb-1 font-medium text-sm text-white/90">Check-in - Check-out</label>
                                <DateRangePickerDropdown />
                            </div>

                            {/* Guests */}
                            <div>
                                <label className="block mb-1 font-medium text-sm text-white/90">Guests</label>
                                <select className="w-full border border-line/20 rounded-xl px-3 py-2 text-text focus:outline-none bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all duration-200 shadow-sm">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="4">4</option>
                                    <option value="8">8</option>
                                </select>
                            </div>

                            {/* Button */}
                            <div className="md:col-span-4">
                                <button className="w-full mt-4 bg-button text-white py-3 px-4 rounded-xl font-semibold hover:bg-button/80 transition-all duration-300 transform shadow-lg cursor-pointer">
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