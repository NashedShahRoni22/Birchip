import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ShowAllBtn({ href, label }) {
  return (
    <div className="flex justify-center mt-12">
      <Link
        href={href}
        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r to-primary from-button text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform  transition-all ease-linear duration-300 backdrop-blur-sm"
      >
        <span>{label}</span>
        <ArrowRight
          size={20}
          className="group-hover:translate-x-1 transition-transform duration-300"
        />
      </Link>
    </div>
  );
}
