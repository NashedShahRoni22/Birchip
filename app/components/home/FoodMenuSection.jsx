"use client";

import { useState } from "react";
import { Salad } from "lucide-react";
import FoodOrderModal from "../shared/FoodOrderModal";
import useGetApi from "@/hooks/useGetApi";
import FoodCard from "@/component/cards/FoodCard";
import useAuth from "@/hooks/useAuth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/component/Pagination/Pagination";
import ShowAllBtn from "@/component/buttons/ShowAllBtn";
import SkeletonCard from "@/component/loaders/CardSkeleton";

export default function FoodMenuSection({ isPage = false }) {
  const { authInfo } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const { data: foodsData, isLoading } = useGetApi(
    `/foods?page=${currentPage}`
  );

  const featuredfoods =
    !isPage && foodsData?.data?.length > 0
      ? foodsData?.data?.slice(0, 6)
      : foodsData?.data || [];

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrderClick = (food) => {
    if (!authInfo?.token) {
      return router.push("/auth");
    }
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

      {/* foods grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : foodsData?.status &&
            featuredfoods?.map((food) => (
              <FoodCard
                key={food?.id}
                foodData={food}
                handleOrderClick={handleOrderClick}
              />
            ))}
      </div>

      {/* pagination */}
      {!isLoading && foodsData?.status && isPage && (
        <Pagination
          pagination={foodsData?.pagination}
          onPageChange={handlePageChange}
        />
      )}

      {/* show all foods */}
      {!isLoading &&
        foodsData?.status &&
        foodsData?.data?.length > 6 &&
        !isPage && <ShowAllBtn href="/foods" label="Show All Foods" />}

      {/* Order Modal */}
      <FoodOrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedFood={selectedFood}
      />
    </section>
  );
}
