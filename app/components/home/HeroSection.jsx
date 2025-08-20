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
import { Calendar, ChevronDown, Hotel, Truck, Users, Plus, Minus } from 'lucide-react';

// Custom Select Component
function CustomSelect({ label, value, onChange, options, icon: Icon }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <label className="block mb-1 font-medium text-sm text-white/90">{label}</label>
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full border border-line/20 rounded-xl px-4 py-3.5 text-left text-text bg-white/90 backdrop-blur-sm hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all duration-200 shadow-sm cursor-pointer flex items-center justify-between"
                >
                    <div className="flex items-center gap-2">
                        {Icon && <Icon className="text-gray-500 text-sm" />}
                        <span>{options.find(opt => opt.value === value)?.label || 'Select...'}</span>
                    </div>
                    <ChevronDown className={`text-gray-400 text-sm transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-line/20">
                        {options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150 cursor-pointer flex items-center gap-2 text-text"
                            >
                                {option.icon && <option.icon className="text-gray-500 text-sm" />}
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// Guest Management Component
function GuestSelector({ label, onGuestChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const [guests, setGuests] = useState({
        adults: 1,
        children: 0
    });

    const updateGuests = (type, operation) => {
        const newGuests = { ...guests };
        if (operation === 'increment') {
            if (type === 'adults' && newGuests.adults < 8) {
                newGuests.adults += 1;
            } else if (type === 'children' && newGuests.children < 6) {
                newGuests.children += 1;
            }
        } else if (operation === 'decrement') {
            if (type === 'adults' && newGuests.adults > 1) {
                newGuests.adults -= 1;
            } else if (type === 'children' && newGuests.children > 0) {
                newGuests.children -= 1;
            }
        }
        setGuests(newGuests);
        onGuestChange(newGuests);
    };

    const totalGuests = guests.adults + guests.children;

    return (
        <div className="relative">
            <label className="block mb-1 font-medium text-sm text-white/90">{label}</label>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full border border-line/20 rounded-xl px-4 py-3.5 text-left text-text bg-white/90 backdrop-blur-sm hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all duration-200 shadow-sm cursor-pointer flex items-center justify-between"
            >
                <div className="flex items-center gap-2">
                    <Users className="text-gray-500 text-sm" />
                    <span>{totalGuests} Guest{totalGuests !== 1 ? 's' : ''}</span>
                </div>
                <ChevronDown className={`text-gray-400 text-sm transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white backdrop-blur-md shadow-2xl rounded-xl overflow-hidden border border-line/20 p-4">
                    <div className="space-y-4">
                        {/* Adults */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-text">Adults</p>
                            </div>
                            <div className="flex items-center gap-3 w-1/2">
                                <button
                                    type="button"
                                    onClick={() => updateGuests('adults', 'decrement')}
                                    disabled={guests.adults <= 1}
                                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <Minus className="text-xs text-gray-600" />
                                </button>
                                <span className="w-8 text-center font-medium text-text">{guests.adults}</span>
                                <button
                                    type="button"
                                    onClick={() => updateGuests('adults', 'increment')}
                                    disabled={guests.adults >= 8}
                                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <Plus className="text-xs text-gray-600" />
                                </button>
                            </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-text">Children</p>
                            </div>
                            <div className="flex items-center gap-3 w-1/2">
                                <button
                                    type="button"
                                    onClick={() => updateGuests('children', 'decrement')}
                                    disabled={guests.children <= 0}
                                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <Minus className="text-xs text-gray-600" />
                                </button>
                                <span className="w-8 text-center font-medium text-text">{guests.children}</span>
                                <button
                                    type="button"
                                    onClick={() => updateGuests('children', 'increment')}
                                    disabled={guests.children >= 6}
                                    className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                >
                                    <Plus className="text-xs text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="px-6 py-2 bg-button text-white rounded-full text-sm cursor-pointer hover:bg-button/90 transition-colors duration-200"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Enhanced Date Range Picker
function DateRangePickerDropdown() {
    const [showPicker, setShowPicker] = useState(false);
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
            key: 'selection',
        },
    ]);

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric'
        });
    };

    return (
        <div className="relative">
            <label className="block mb-1 font-medium text-sm text-white/90">Check-in - Check-out</label>
            <button
                type="button"
                onClick={() => setShowPicker(!showPicker)}
                className="w-full border border-line/20 rounded-xl px-4 py-3.5 text-left text-text bg-white/90 backdrop-blur-sm hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all duration-200 shadow-sm cursor-pointer flex items-center justify-between"
            >
                <div className="flex items-center gap-2">
                    <Calendar className="text-gray-500 text-sm" />
                    <span className="flex items-center gap-2">
                        <span>{formatDate(range[0].startDate)}</span>
                        <span className="text-gray-400">-</span>
                        <span>{formatDate(range[0].endDate)}</span>
                    </span>
                </div>
                <ChevronDown className={`text-gray-400 text-sm transition-transform duration-200 ${showPicker ? 'rotate-180' : ''}`} />
            </button>
            
            {showPicker && (
                <div className="absolute z-50 mt-2 p-4 bg-white backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-line/20 left-0 right-0 sm:left-auto sm:right-auto sm:w-auto">
                    <div className="hidden lg:block">
                        <DateRange
                            editableDateInputs
                            onChange={(item) => setRange([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                            rangeColors={["#B63D5E"]}
                            months={2}
                            direction="horizontal"
                            minDate={new Date()}
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
                            minDate={new Date()}
                            showMonthAndYearPickers={false}
                        />
                    </div>
                    <div className='flex justify-center mt-3'>
                        <button
                            type="button"
                            onClick={() => setShowPicker(!showPicker)}
                            className='px-4 md:px-6 py-1.5 md:py-2 bg-button text-white rounded-full text-xs md:text-sm cursor-pointer hover:bg-button/90 transition-colors duration-200'>
                            Confirm
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function HeroSection() {
    const [accommodationType, setAccommodationType] = useState('room');
    const [guestData, setGuestData] = useState({ adults: 1, children: 0 });

    const accommodationOptions = [
        { value: 'room', label: 'Room', icon: Hotel },
        { value: 'caravan', label: 'Caravan', icon: Truck }
    ];

    const handleGuestChange = (guests) => {
        setGuestData(guests);
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
            <div className="absolute inset-0 bg-black/50 z-10" />

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
                                <CustomSelect
                                    label="Accommodation"
                                    value={accommodationType}
                                    onChange={setAccommodationType}
                                    options={accommodationOptions}
                                />
                            </div>

                            {/* Date Range */}
                            <div className="md:col-span-2">
                                <DateRangePickerDropdown />
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
                                    className="w-full mt-4 bg-button text-white py-3 px-4 rounded-xl font-semibold hover:bg-button/80 transition-all duration-300 transform shadow cursor-pointer"
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