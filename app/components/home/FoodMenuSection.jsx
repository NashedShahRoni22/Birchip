'use client';

import {
    Sandwich,
    Drumstick,
    Soup,
    Pizza,
    Leaf,
    CakeSlice,
    Coffee,
    Salad,
    Star,
} from 'lucide-react';

import FoodImage from "@/public/cardImage/food.jpg";
import Image from 'next/image';

const foodMenu = [
    {
        id: 1,
        name: 'Grilled Chicken Wrap',
        price: 12.99,
        icon: <Sandwich className="w-10 h-10 text-[#603C59]" />,
        available: true,
    },
    {
        id: 2,
        name: 'Veggie Delight Burger',
        price: 10.49,
        icon: <Leaf className="w-10 h-10 text-[#603C59]" />,
        available: true,
    },
    {
        id: 3,
        name: 'Classic Pepperoni Pizza',
        price: 15.99,
        icon: <Pizza className="w-10 h-10 text-[#603C59]" />,
        available: false,
    },
    {
        id: 4,
        name: 'Hearty Beef Stew',
        price: 13.75,
        icon: <Soup className="w-10 h-10 text-[#603C59]" />,
        available: true,
    },
    {
        id: 5,
        name: 'Roasted Chicken Drumstick',
        price: 11.5,
        icon: <Drumstick className="w-10 h-10 text-[#603C59]" />,
        available: true,
    },
    {
        id: 6,
        name: 'Gourmet Sandwich',
        price: 9.99,
        icon: <Sandwich className="w-10 h-10 text-[#603C59]" />,
        available: false,
    },
    {
        id: 7,
        name: 'Chocolate Lava Cake',
        price: 6.5,
        icon: <CakeSlice className="w-10 h-10 text-[#603C59]" />,
        available: true,
    },
    {
        id: 8,
        name: 'Hot Espresso Coffee',
        price: 4.25,
        icon: <Coffee className="w-10 h-10 text-[#603C59]" />,
        available: true,
    },
];

const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: fullStars }, (_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
            {hasHalfStar && (
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 opacity-50" />
            )}
        </div>
    );
};

export default function FoodMenuSection() {
    return (
        <section className="py-20 px-6 bg-bg">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 bg-secondary/60 backdrop-blur-sm px-4 py-2 rounded-full border border-line/20 mb-6">
                    <Salad className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-muted">Delicious Delights</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
                    Explore Our
                    <span className="block text-primary">Food Menu</span>
                </h2>
                <p className="text-xl text-muted max-w-3xl mx-auto">
                    Savor every bite with our curated selection of meals—hot, fresh, and made just for your road adventure.
                </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
                {foodMenu.map((food) => (
                    <div
                        key={food.id}
                        className="group backdrop-blur-xl rounded-2xl border border-line/20 shadow-lg transition-all duration-500 overflow-hidden"
                    >
                        {/* Availability Badge */}
                        <div className={`absolute top-3 right-3 z-10 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold shadow-lg ${food.available
                            ? 'bg-green-500 text-white border border-green-500/30'
                            : 'bg-red-500 text-white border border-red-500/30'
                            }`}>
                            {food.available ? 'Available' : 'Out of Stock'}
                        </div>

                        <div className="relative h-40 sm:h-48 flex items-center justify-center overflow-hidden">
                            <Image
                                src={FoodImage}
                                alt='Food Image'
                                className='w-full h-full object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500'
                            />
                            {/* Price Overlay */}
                            <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1 rounded-lg">
                                <span className="text-sm sm:text-base font-bold">${food.price.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="p-4 sm:p-6 mt-2 sm:mt-4 flex flex-col items-center text-center">
                            <h3 className="text-base sm:text-lg font-semibold text-[#41393D] mb-2 line-clamp-2 group-hover:text-[#B63D5E] transition-colors">
                                {food.name}
                            </h3>

                            {/* Rating/Description could go here */}
                            <div className="flex items-center gap-2 sm:gap-3">
                                {renderStars(4.5)}
                            </div>

                            <button
                                disabled={!food.available}
                                className={`w-full px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 mt-3 ${food.available
                                    ? 'bg-primary text-white hover:bg-button hover:shadow-lg active:scale-95 cursor-pointer'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                {food.available ? 'Order Now' : 'Unavailable'}
                            </button>
                        </div>

                        {/* Gradient Border Effect */}
                        {food.available && (
                            <div className="absolute inset-0 bg-gradient-to-r from-[#B63D5E]/5 via-transparent to-[#B63D5E]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
