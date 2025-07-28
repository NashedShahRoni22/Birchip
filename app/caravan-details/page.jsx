'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  Star,
  Users,
  Bed,
  Maximize,
  Wifi,
  Wind,
  Tv,
  Coffee,
  Bath,
  Car,
  Calendar,
  Clock,
  MapPin,
  ChevronLeft,
  Heart,
  Share2,
  CheckCircle,
  Camera
} from 'lucide-react';
import CaravanImage from "@/public/cardImage/caravan.jpg";
import { BookingModal } from '../components/shared/AnimatePresence';

// Enhanced room data with description
const caravanData =
{
  id: 1,
  name: 'Compact Caravan',
  type: 'caravan',
  price: 90,
  originalPrice: 110,
  rating: 4.3,
  reviews: 15,
  capacity: 2,
  beds: '1 Double Bed',
  size: '18 m²',
  description: '300+ word comprehensive description...',
  features: ['AC', 'Smart TV', 'Mini Kitchen'],
  amenities: [
    { icon: Wind, label: 'AC' },
    { icon: Tv, label: 'Smart TV' },
    { icon: Coffee, label: 'Mini Kitchen' },
    { icon: Car, label: 'Parking' },
    { icon: Maximize, label: 'Outdoor Space' },
    { icon: Bath, label: 'Shared Facilities' }
  ],
  available: true,
  popular: false,
  images: [CaravanImage, CaravanImage, CaravanImage, CaravanImage],
  checkIn: '2:00 PM',
  checkOut: '11:00 AM',
  location: 'Caravan Park Area'
}

export default function CaravanDetailsPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ id: '', type: '' });

  // When clicking a card:
  const handleCardClick = () => {
    setSelectedItem({
      id: caravanData.id.toString(),
      type: 'caravan' // or 'caravan' or 'food' depending on what you're booking
    });
    setIsBookingOpen(true);
  }
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? caravanData.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === caravanData.images.length - 1 ? 0 : prev + 1
    );
  };

  const truncatedDescription = caravanData.description.slice(0, 300) + '...';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">Back to caravans</span>
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full border transition-all cursor-pointer ${isLiked
                    ? 'bg-red-50 border-red-200 text-red-600'
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              </button>
              <button className="p-2 rounded-full border bg-white border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src={caravanData.images[currentImageIndex]}
                  alt={`${caravanData.name} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Image Navigation */}
                {caravanData.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors cursor-pointer rotate-180"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  {currentImageIndex + 1} / {caravanData.images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {caravanData.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {caravanData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${index === currentImageIndex
                          ? 'border-primary'
                          : 'border-gray-200 hover:border-gray-300'
                        }`}
                    >
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        width={80}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Room Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {caravanData.name}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {caravanData.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Up to {caravanData.capacity} guests
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">{caravanData.rating}</span>
                      <span className="text-gray-600">({caravanData.reviews} reviews)</span>
                    </div>
                    {caravanData.popular && (
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                        Popular Choice
                      </span>
                    )}
                  </div>
                </div>

                {/* Room Specs */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <Bed className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">{caravanData.beds}</p>
                    <p className="text-xs text-gray-600">Bed Configuration</p>
                  </div>
                  <div className="text-center">
                    <Maximize className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">{caravanData.size}</p>
                    <p className="text-xs text-gray-600">Room Size</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">{caravanData.capacity} Guests</p>
                    <p className="text-xs text-gray-600">Max Capacity</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Room Amenities</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {caravanData.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <amenity.icon className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Room</h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {showFullDescription ? caravanData.description : truncatedDescription}
                  </p>
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-primary hover:text-button font-medium mt-2 cursor-pointer"
                  >
                    {showFullDescription ? 'Show Less' : 'Read More'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">${caravanData.price}</span>
                    <span className="text-lg text-gray-600">/ night</span>
                    {caravanData.originalPrice > caravanData.price && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${caravanData.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Available now</span>
                  </div>
                </div>

                {/* Check-in/Check-out Info */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">Check-in</span>
                    </div>
                    <p className="text-sm text-gray-600">{caravanData.checkIn}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-900">Check-out</span>
                    </div>
                    <p className="text-sm text-gray-600">{caravanData.checkOut}</p>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-4">
                  <button onClick={handleCardClick} className="w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:bg-button transition-colors cursor-pointer">
                    Reserve Now
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer">
                    Check Availability
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-600 text-center">
                    Free cancellation up to 24 hours before check-in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal  */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        itemId={selectedItem.id}
        itemType={selectedItem.type}
      />

    </div>
  );
}