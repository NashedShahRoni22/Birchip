import HeroSection from "./components/home/HeroSection";
import ServicesSection from "./components/home/ServicesSection";
import CustomerReviewsSection from "./components/home/CustomerReviewsSection";
import MotelRoomsSection from "./components/home/MotelRoomsSection";
import CaravanSection from "./components/home/CaravanSection";
import FoodMenuSection from "./components/home/FoodMenuSection";
import GasStationSection from "./components/home/GasStationSection";

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
