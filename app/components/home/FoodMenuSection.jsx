"use client";

import { useState } from "react";
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
} from "lucide-react";
import FoodOrderModal from "../shared/FoodOrderModal";
import useGetApi from "@/hooks/useGetApi";
import FoodCard from "@/component/cards/FoodCard";

const foodMenu = [
  {
    id: 1,
    name: "Grilled Chicken Wrap",
    price: 12.99,
    icon: <Sandwich className="w-10 h-10 text-[#603C59]" />,
    available: true,
  },
  {
    id: 2,
    name: "Veggie Delight Burger",
    price: 10.49,
    icon: <Leaf className="w-10 h-10 text-[#603C59]" />,
    available: true,
  },
  {
    id: 3,
    name: "Classic Pepperoni Pizza",
    price: 15.99,
    icon: <Pizza className="w-10 h-10 text-[#603C59]" />,
    available: false,
  },
  {
    id: 4,
    name: "Hearty Beef Stew",
    price: 13.75,
    icon: <Soup className="w-10 h-10 text-[#603C59]" />,
    available: true,
  },
  {
    id: 5,
    name: "Roasted Chicken Drumstick",
    price: 11.5,
    icon: <Drumstick className="w-10 h-10 text-[#603C59]" />,
    available: true,
  },
  {
    id: 6,
    name: "Gourmet Sandwich",
    price: 9.99,
    icon: <Sandwich className="w-10 h-10 text-[#603C59]" />,
    available: false,
  },
  {
    id: 7,
    name: "Chocolate Lava Cake",
    price: 6.5,
    icon: <CakeSlice className="w-10 h-10 text-[#603C59]" />,
    available: true,
  },
  {
    id: 8,
    name: "Hot Espresso Coffee",
    price: 4.25,
    icon: <Coffee className="w-10 h-10 text-[#603C59]" />,
    available: true,
  },
];

export default function FoodMenuSection() {
  const { data: foodsData, isLoading } = useGetApi("/foods");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const handleOrderClick = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  return (
    <section className="py-20 px-6 bg-bg">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-secondary/60 backdrop-blur-sm px-4 py-2 rounded-full border border-line/20 mb-6">
          <Salad className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted">
            Delicious Delights
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
          Explore Our
          <span className="block text-primary">Food Menu</span>
        </h2>
        <p className="text-xl text-muted max-w-3xl mx-auto">
          Savor every bite with our curated selection of meals—hot, fresh, and
          made just for your road adventure.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
        {!isLoading &&
          foodsData?.data?.length > 0 &&
          foodsData?.data?.map((food) => (
            <FoodCard
              key={food?.id}
              foodData={food}
              handleOrderClick={handleOrderClick}
            />
          ))}
      </div>

      {/* Order Modal */}
      <FoodOrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedFood={selectedFood}
      />
    </section>
  );
}
