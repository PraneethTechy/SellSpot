import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function CategoryCard({ category }) {

  const Icon = category.icon;

  return (

    <Link to={`/category/${category.name.toLowerCase()}`}>

      <div
        className="
        group
        bg-white
        rounded-3xl
        border
        border-gray-200
        p-7
        transition-all
        duration-300
        hover:border-amber-400
        hover:-translate-y-2
        hover:shadow-xl
        cursor-pointer
      "
      >

        <div className="flex items-center justify-between">

          <div
            className="
            w-16
            h-16
            rounded-2xl
            bg-amber-100
            flex
            items-center
            justify-center
            transition
            group-hover:bg-amber-400
          "
          >

            <Icon
              size={30}
              className="
              text-amber-600
              group-hover:text-slate-900
              transition
            "
            />

          </div>

          <ArrowRight
            size={20}
            className="
            text-gray-400
            opacity-0
            group-hover:opacity-100
            group-hover:translate-x-1
            transition
          "
          />

        </div>

        <h3 className="mt-8 text-xl font-bold text-slate-900">
          {category.name}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Explore products
        </p>

      </div>

    </Link>

  );
}