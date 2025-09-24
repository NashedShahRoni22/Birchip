'use client';

import { useState, useEffect, useRef } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function CustomerReviewsSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [swiperInstance, setSwiperInstance] = useState(null);

    const reviews = [
        {
            id: 1,
            name: 'Sarah Johnson',
            location: 'Melbourne, VIC',
            rating: 5,
            date: '2 weeks ago',
            review: 'Amazing experience! The motel room was spotless and the staff were incredibly friendly. The caravan parking was spacious and secure. Will definitely stay here again on our next road trip.',
            service: 'Motel & Caravan',
            avatar: 'SJ',
            verified: true
        },
        {
            id: 2,
            name: 'Michael Chen',
            location: 'Sydney, NSW',
            rating: 5,
            date: '1 month ago',
            review: 'Great value for money! The gas prices were competitive and the food from the restaurant was delicious. Perfect stop for travelers. Highly recommend the fish and chips!',
            service: 'Gas & Food',
            avatar: 'MC',
            verified: true
        },
        {
            id: 3,
            name: 'Emma Thompson',
            location: 'Brisbane, QLD',
            rating: 4,
            date: '3 weeks ago',
            review: 'Lovely place to stay during our family vacation. The kids loved the playground area and the rooms were comfortable. The online ordering system for food was very convenient.',
            service: 'Motel & Food',
            avatar: 'ET',
            verified: true
        },
        {
            id: 4,
            name: 'David Rodriguez',
            location: 'Perth, WA',
            rating: 5,
            date: '1 week ago',
            review: 'Excellent facilities for caravan travelers. Power hookups worked perfectly and the dump station was clean. The staff went above and beyond to help us with directions.',
            service: 'Caravan Parking',
            avatar: 'DR',
            verified: true
        },
    ];

    const nextSlide = () => {
        if (swiperInstance) {
            swiperInstance.slideNext();
        }
    };

    const prevSlide = () => {
        if (swiperInstance) {
            swiperInstance.slidePrev();
        }
    };

    const goToSlide = (index) => {
        if (swiperInstance) {
            swiperInstance.slideToLoop(index);
        }
    };

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <Star
                key={index}
                className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-line/30'
                    }`}
            />
        ));
    };

    return (
        <section className="relative py-20 bg-bg overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(96,60,89,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(123,166,147,0.1),transparent_50%)]"></div>

            <div className="relative max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-secondary/60 backdrop-blur-sm px-4 py-2 rounded-full border border-line/20 mb-6">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm font-medium text-muted">Customer Reviews</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
                        What Our Guests
                        <span className="block text-primary">
                            Are Saying
                        </span>
                    </h2>
                    <p className="text-xl text-muted max-w-3xl mx-auto">
                        Don't just take our word for it. Here's what real travelers have to say
                        about their experience with us.
                    </p>
                </div>

                {/* Reviews Container */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between z-10">
                        <button
                            onClick={prevSlide}
                            onMouseEnter={() => setIsAutoPlaying(false)}
                            onMouseLeave={() => setIsAutoPlaying(true)}
                            className="cursor-pointer w-12 h-12 bg-white backdrop-blur-sm rounded-full flex items-center justify-center border border-line/20 hover:bg-primary hover:text-white hover:border-primary/30 transition-all duration-300 transform hover:scale-110 shadow -translate-x-6"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextSlide}
                            onMouseEnter={() => setIsAutoPlaying(false)}
                            onMouseLeave={() => setIsAutoPlaying(true)}
                            className="cursor-pointer w-12 h-12 bg-white backdrop-blur-sm rounded-full flex items-center justify-center border border-line/20 hover:bg-primary hover:text-white hover:border-primary/30 transition-all duration-300 transform hover:scale-110 shadow translate-x-6"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Swiper Container */}
                    <div
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(true)}
                    >
                        <Swiper
                            onSwiper={setSwiperInstance}
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={20}
                            slidesPerView={1}
                            loop={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                    spaceBetween: 20,
                                },
                                768: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                },
                            }}
                            onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
                            className="overflow-visible"
                        >
                            {reviews.map((review) => (
                                <SwiperSlide key={review.id} className="h-full">
                                    {/* Wrapper to ensure equal height */}
                                    <div className="h-full flex">
                                        {/* Review Card with fixed height */}
                                        <div className="relative bg-white backdrop-blur-xl rounded-2xl p-8 border border-line/20 w-full flex flex-col h-[480px]">
                                            {/* Gradient Background */}
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl opacity-20"></div>

                                            {/* Content */}
                                            <div className="relative z-10 flex flex-col flex-1">
                                                {/* Quote Icon */}
                                                <div className="mb-6">
                                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                                        <Quote className="w-6 h-6 text-primary" />
                                                    </div>
                                                </div>

                                                {/* Rating */}
                                                <div className="flex items-center gap-1 mb-4">
                                                    {renderStars(review.rating)}
                                                </div>

                                                {/* Review Text */}
                                                <p className="text-muted mb-6 leading-relaxed flex-1">
                                                    "{review.review}"
                                                </p>

                                                {/* Service Badge */}
                                                <div className="mb-6">
                                                    <span className="inline-flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
                                                        {review.service}
                                                    </span>
                                                </div>

                                                {/* Author Info */}
                                                <div className="flex items-center gap-4 mt-auto">
                                                    {/* Avatar */}
                                                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                                                        <span className="text-white font-bold text-sm">
                                                            {review.avatar}
                                                        </span>
                                                    </div>

                                                    {/* Details */}
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h4 className="font-semibold text-text">{review.name}</h4>
                                                            {review.verified && (
                                                                <div className="w-4 h-4 bg-accent rounded-full flex items-center justify-center">
                                                                    <div className="w-2 h-2 bg-white rounded-full"></div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex items-center gap-4 text-sm text-muted">
                                                            <div className="flex items-center gap-1">
                                                                <MapPin className="w-3 h-3" />
                                                                {review.location}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="w-3 h-3" />
                                                                {review.date}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="flex md:hidden items-center justify-center gap-4 mt-8">
                        <button
                            onClick={prevSlide}
                            className="cursor-pointer w-10 h-10 bg-secondary/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-line/20 hover:bg-secondary/90 transition-all duration-300"
                        >
                            <ChevronLeft className="w-5 h-5 text-primary" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="cursor-pointer w-10 h-10 bg-secondary/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-line/20 hover:bg-secondary/90 transition-all duration-300"
                        >
                            <ChevronRight className="w-5 h-5 text-primary" />
                        </button>
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="hidden md:flex items-center justify-center gap-3 mt-12">
                    {reviews.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            onMouseEnter={() => setIsAutoPlaying(false)}
                            onMouseLeave={() => setIsAutoPlaying(true)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${index === currentSlide
                                ? 'bg-primary scale-125'
                                : 'bg-line/30 hover:bg-line/50'
                                }`}
                        />
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">4.9</div>
                        <div className="text-sm text-muted">Average Rating</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-accent mb-2">1,200+</div>
                        <div className="text-sm text-muted">Happy Customers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-info mb-2">98%</div>
                        <div className="text-sm text-muted">Satisfaction Rate</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-success mb-2">5</div>
                        <div className="text-sm text-muted">Years of Service</div>
                    </div>
                </div>
            </div>
        </section>
    );
}