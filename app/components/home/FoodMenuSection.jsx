"use client";

import { useState } from "react";
import { Salad, ShoppingCart } from "lucide-react";
import FoodOrderModal from "../shared/FoodOrderModal";
import useGetApi from "@/hooks/useGetApi";
import FoodCard from "@/component/cards/FoodCard";
import useAuth from "@/hooks/useAuth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/component/Pagination/Pagination";
import ShowAllBtn from "@/component/buttons/ShowAllBtn";
import SkeletonCard from "@/component/loaders/CardSkeleton";
import CartModal from "@/component/modals/CartModal";
import { useCart } from "@/hooks/useCart";
import { AnimatePresence, motion } from "framer-motion";

export default function FoodMenuSection({ isPage = false }) {
  const pathName = usePathname();
  const showCartButton = pathName === "/foods";
  const { authInfo } = useAuth();
  const { cart, addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const { data: foodsData, isLoading } = useGetApi(
    `/foods?page=${currentPage}`,
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
    addToCart(food);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  return (
    <section className="bg-bg relative px-6 py-20">
      <div className="mb-16 text-center">
        <div className="bg-secondary/60 border-line/20 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
          <Salad className="text-primary h-4 w-4" />
          <span className="text-muted text-sm font-medium">
            Delicious Delights
          </span>
        </div>
        <h2 className="text-text mb-4 text-4xl font-bold md:text-5xl">
          Explore Our
          <span className="text-primary block">Food Menu</span>
        </h2>
        <p className="text-muted mx-auto max-w-3xl text-xl">
          Savor every bite with our curated selection of meals—hot, fresh, and
          made just for your road adventure.
        </p>
      </div>

      {/* foods grid */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
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

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <AnimatePresence>
        {showCartButton && cart?.length > 0 && !isCartOpen && (
          <motion.button
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={() => setIsCartOpen((prev) => !prev)}
            className="fixed top-1/2 right-0 z-50 inline-flex -translate-y-1/2 cursor-pointer flex-col items-center gap-1"
          >
            <div className="bg-primary rounded-l-md px-3 py-2 text-white">
              <ShoppingCart size={18} />
            </div>

            <p className="bg-primary rounded px-2.5 py-0.5 text-xs text-white">
              {cart?.length}
            </p>
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
