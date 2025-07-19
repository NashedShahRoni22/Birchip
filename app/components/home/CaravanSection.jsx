'use client';

import { Caravan, Users, MapPin, Star, Wind, Tv, Coffee, Car, Bath } from 'lucide-react';
import CaravanImage from "@/public/cardImage/caravan.jpg";
import Image from 'next/image';

export default function CaravanSection() {
    const caravans = [
        {
            id: 1,
            name: 'Compact Caravan',
            price: 90,
            originalPrice: 110,
            rating: 4.3,
            reviews: 15,
            capacity: 2,
            beds: '1 Double Bed',
            size: '18 m²',
            features: ['AC', 'Smart TV', 'Mini Kitchen'],
            amenities: [
                { icon: Wind, label: 'AC' },
                { icon: Tv, label: 'Smart TV' },
                { icon: Coffee, label: 'Mini Kitchen' }
            ]
        },
        {
            id: 2,
            name: 'Family Caravan',
            price: 150,
            originalPrice: 180,
            rating: 4.7,
            reviews: 22,
            capacity: 4,
            beds: '2 Double Beds',
            size: '28 m²',
            features: ['AC', 'Smart TV', 'Full Kitchen', 'Dining Area'],
            amenities: [
                { icon: Wind, label: 'AC' },
                { icon: Tv, label: 'Smart TV' },
                { icon: Coffee, label: 'Full Kitchen' }
            ]
        },
        {
            id: 3,
            name: 'Luxury Caravan Suite',
            price: 220,
            originalPrice: 260,
            rating: 4.9,
            reviews: 30,
            capacity: 4,
            beds: '1 King + Sofa',
            size: '35 m²',
            features: ['AC', '3 TVs', 'Full Kitchen', 'Balcony'],
            amenities: [
                { icon: Wind, label: 'AC' },
                { icon: Tv, label: '3 Smart TVs' },
                { icon: Coffee, label: 'Premium Kitchen' }
            ]
        },
        {
            id: 4,
            name: 'Adventure Camper',
            price: 100,
            originalPrice: 120,
            rating: 4.2,
            reviews: 12,
            capacity: 2,
            beds: '1 Queen Bed',
            size: '20 m²',
            features: ['Portable AC', 'TV', 'Outdoor Cooking'],
            amenities: [
                { icon: Wind, label: 'Portable AC' },
                { icon: Tv, label: 'TV' },
                { icon: Coffee, label: 'Outdoor Cooking' }
            ]
        },
        {
            id: 5,
            name: 'Pet-Friendly Caravan',
            price: 130,
            originalPrice: 150,
            rating: 4.6,
            reviews: 18,
            capacity: 3,
            beds: '1 Double Bed + Pet Bed',
            size: '24 m²',
            features: ['AC', 'TV', 'Pet Area'],
            amenities: [
                { icon: Wind, label: 'AC' },
                { icon: Tv, label: 'TV' },
                { icon: Coffee, label: 'Pet Area' }
            ]
        },
        {
            id: 6,
            name: 'Budget Traveler Caravan',
            price: 70,
            originalPrice: 90,
            rating: 4.0,
            reviews: 10,
            capacity: 2,
            beds: '1 Foldable Bed',
            size: '16 m²',
            features: ['Fan', 'Mini TV', 'Compact Kitchen'],
            amenities: [
                { icon: Wind, label: 'Fan' },
                { icon: Tv, label: 'Mini TV' },
                { icon: Coffee, label: 'Compact Kitchen' }
            ]
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

    return (
        <section className="py-20 bg-bg">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-secondary/60 backdrop-blur-sm px-4 py-2 rounded-full border border-line/20 mb-6">
                        <Caravan className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-muted">Adventure Ready</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
                        Explore Our
                        <span className="block text-primary">Caravan Options</span>
                    </h2>
                    <p className="text-xl text-muted max-w-3xl mx-auto">
                        Enjoy the freedom of the road with our fully equipped, comfortable caravans—perfect for families, couples, or solo travelers.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {caravans.map((van) => (
                        <div key={van.id} className="group backdrop-blur-xl rounded-2xl border border-line/20 shadow-lg">
                            <div className="relative h-52 sm:h-56 bg-gradient-to-br from-accent/10 to-secondary/30 flex items-center justify-center overflow-hidden rounded-t-2xl">
                                <Image src={CaravanImage} alt='Caravan Image' className='w-full h-full object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500' />
                            </div>
                            <div className="p-4 sm:p-6">
                                <div className="mb-3 sm:mb-4">
                                    <h3 className="text-lg sm:text-xl font-bold text-text mb-2">{van.name}</h3>
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        {renderStars(van.rating)}
                                        <span className="text-xs sm:text-sm text-muted">{van.rating} ({van.reviews} reviews)</span>
                                    </div>
                                </div>

                                <div className="mb-3 sm:mb-4 space-y-2 text-xs sm:text-sm text-muted">
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <div className="flex items-center gap-1">
                                            <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                                            <span>{van.capacity} guests</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Caravan className="w-3 h-3 sm:w-4 sm:h-4" />
                                            <span>{van.beds}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                                        <span>{van.size}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1 sm:gap-2">
                                        <div className="text-xl sm:text-2xl font-bold text-primary">${van.price}</div>
                                        <div className="text-xs sm:text-sm text-muted">/night</div>
                                    </div>
                                    <button className="cursor-pointer px-4 py-2 sm:px-6 sm:py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-bold hover:bg-button transition-all">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
