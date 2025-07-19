import Image from "next/image";
import aboutImg from "@/public/banners/banner (2).jpg";
import Link from "next/link";

export default function Page() {
    return (
        <section className="relative bg-gradient-to-br from-indigo-50/50 to-teal-50/50 text-gray-800 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-200/20 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-teal-200/20 rounded-full filter blur-3xl"></div>
            </div>

            {/* Hero Section */}
            <div className="relative mb-24 min-h-[90vh] w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={aboutImg}
                        alt="Birchip Motel & Caravan Park"
                        fill
                        className="object-cover"
                        quality={100}
                        priority
                    />
                    {/* Gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent"></div>

                    {/* Text Content */}
                    <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-24 md:pb-32 lg:pb-40">
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-button drop-shadow-lg">
                                Birchip Motel & Caravan Park
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                                Welcome to your all-in-one travel companion. We provide essential services that make your journey smoother—from motel stays to food, parking, and fuel.
                            </p>
                            <div className="pt-6">
                                <Link href={"/motel"} className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-button hover:from-button hover:to-primary text-white font-semibold rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group">
                                    Explore Our Services
                                    <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scrolling indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="animate-bounce w-8 h-8 border-4 border-white/50 rounded-full"></div>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto z-10 py-20">
                {/* Services Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-24">
                    {/* Motel & Caravan Booking */}
                    <div className="bg-white/30 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start mb-4">
                            <div className="bg-indigo-100/50 p-3 rounded-xl mr-4">
                                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-semibold text-gray-800">Motel & Caravan Booking</h2>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Whether you're on a road trip or need a restful stop, our fully-furnished motel rooms and caravans offer the perfect stay. Quick booking, flexible options, and 24/7 support.
                        </p>
                        <ul className="space-y-2">
                            {['Air-conditioned motel rooms', 'Caravan booking with flexible time slots', 'Cancelation & instant confirmation'].map((item, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                    <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Food Ordering */}
                    <div className="bg-white/30 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start mb-4">
                            <div className="bg-teal-100/50 p-3 rounded-xl mr-4">
                                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-semibold text-gray-800">On-the-Go Food Ordering</h2>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Fuel up with delicious meals while you travel. Order from our in-house kitchen with a range of options to satisfy your hunger at any time.
                        </p>
                        <ul className="space-y-2">
                            {['Breakfast, lunch, dinner & dessert options', 'Instant order & pick-up', 'Freshly cooked, hygienic, and affordable'].map((item, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                    <svg className="w-5 h-5 text-teal-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Gas Station Service */}
                    <div className="bg-white/30 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start mb-4">
                            <div className="bg-amber-100/50 p-3 rounded-xl mr-4">
                                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-semibold text-gray-800">Gas Station Support</h2>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            We provide easy access to fueling stations with transparent pricing. Pay directly via the app and avoid long queues.
                        </p>
                        <ul className="space-y-2">
                            {['Available 24/7 across multiple stops', 'Fast pay-and-go experience', 'Regular fuel updates in the app'].map((item, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                    <svg className="w-5 h-5 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Caravan Parking */}
                    <div className="bg-white/30 backdrop-blur-xl p-8 rounded-3xl border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="flex items-start mb-4">
                            <div className="bg-purple-100/50 p-3 rounded-xl mr-4">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-semibold text-gray-800">Caravan Parking Areas</h2>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Safe and spacious parking areas for your caravan. Easily locate, book, and manage your parking slot—all from your dashboard.
                        </p>
                        <ul className="space-y-2">
                            {['Secure overnight caravan parking', 'Water, power, and waste services', 'Real-time availability & smart alerts'].map((item, index) => (
                                <li key={index} className="flex items-center text-gray-700">
                                    <svg className="w-5 h-5 text-purple-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-white/30 backdrop-blur-xl rounded-3xl border border-white/40 p-12 shadow-xl mb-24">
                    <div className="grid md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: "10K+", label: "Happy Travelers" },
                            { number: "24/7", label: "Support Available" },
                            { number: "50+", label: "Service Locations" },
                            { number: "98%", label: "Satisfaction Rate" }
                        ].map((stat, index) => (
                            <div key={index} className="p-4">
                                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-button mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 text-lg">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="text-center py-20">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready for Your Next Journey?</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Join thousands of travelers who trust us for their accommodation, dining, and fueling needs on the road.
                    </p>
                    <button className="cursor-pointer bg-gradient-to-r from-primary to-button hover:from-button hover:to-primary text-white font-semibold py-3 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                        Get Started Now
                    </button>
                </div>
            </div>
        </section>
    );
}