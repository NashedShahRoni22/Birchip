import HeroSection from "../component/sections/home/HeroSection";
import ServicesSection from "../component/sections/home/ServicesSection";
import CustomerReviewsSection from "../component/sections/home/CustomerReviewsSection";
import MotelRoomsSection from "../component/sections/home/MotelRoomsSection";
import CaravanSection from "../component/sections/home/CaravanSection";
import FoodMenuSection from "../component/sections/home/FoodMenuSection";
import GasStationSection from "../component/sections/home/GasStationSection";

export default function page() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <MotelRoomsSection />
      <CaravanSection />
      <FoodMenuSection />
      <GasStationSection />
      <CustomerReviewsSection />
    </>
  );
}
