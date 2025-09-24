"use client";

import { Caravan } from "lucide-react";
import useGetApi from "@/hooks/useGetApi";
import MotelCaravanCard from "@/component/cards/MotelCaravanCard";
import ShowAllBtn from "@/component/buttons/ShowAllBtn";
import Pagination from "@/component/Pagination/Pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SkeletonCard from "@/component/loaders/CardSkeleton";

export default function CaravanSection({ isPage = false }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;

  const { data: caravansData, isLoading } = useGetApi(
    `/caravans?page=${currentPage}`,
  );

  const featuredCaravans =
    !isPage && caravansData?.data?.length > 0
      ? caravansData?.data?.slice(0, 6)
      : caravansData?.data || [];

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <div className="bg-secondary/60 border-line/20 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
            <Caravan className="text-primary h-4 w-4" />
            <span className="text-muted text-sm font-medium">
              Adventure Ready
            </span>
          </div>
          <h2 className="text-text mb-4 text-4xl font-bold md:text-5xl">
            Explore Our
            <span className="text-primary block">Caravan Options</span>
          </h2>
          <p className="text-muted mx-auto max-w-3xl text-xl">
            Enjoy the freedom of the road with our fully equipped, comfortable
            caravans—perfect for families, couples, or solo travelers.
          </p>
        </div>

        {/* caravans grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : caravansData?.status &&
              featuredCaravans?.map((caravan) => (
                <MotelCaravanCard key={caravan?.id} data={caravan} isCaravan />
              ))}
        </div>

        {!isLoading && caravansData?.status && isPage && (
          <Pagination
            pagination={caravansData?.pagination}
            onPageChange={handlePageChange}
          />
        )}

        {!isLoading &&
          caravansData?.status &&
          caravansData?.data?.length > 6 &&
          !isPage && <ShowAllBtn href="/caravans" label="Show All Caravans" />}
      </div>
    </section>
  );
}
