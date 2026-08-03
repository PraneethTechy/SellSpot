import categories from "../../utils/categories";
import CategoryCard from "./CategoryCard";
import { ArrowRight } from "lucide-react";

export default function Categories() {
  return (
    <section className="py-20 bg-stone-100">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}

        <div className="flex items-center justify-between mb-12">

          <div>

            <p className="text-amber-600 font-semibold uppercase tracking-wider text-sm">
              Categories
            </p>

            <h2 className="mt-2 text-4xl font-bold text-slate-900">
              Browse by Category
            </h2>

            <p className="mt-3 text-slate-600">
              Explore products across different categories and discover great deals.
            </p>

          </div>

        

        </div>

        {/* Categories */}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-7">

          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}

        </div>

      </div>

    </section>
  );
}