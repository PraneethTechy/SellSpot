import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Tag } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Hero() {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const [item, setItem] = useState("");
  const [location, setLocation] = useState("");

  const name = profile?.full_name || user?.email?.split("@")[0];

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!item && !location) return;
    navigate(
      `/search?item=${encodeURIComponent(item)}&location=${encodeURIComponent(location)}`
    );
  };

  const handleTagClick = (product) => {
    setItem(product);
    navigate(`/search?item=${encodeURIComponent(product)}&location=${encodeURIComponent(location)}`);
  };

  // Specific product searches instead of broad categories
  const popularProducts = ["iPhone", "Car", "Bike", "MacBook", "PS5", "Sofa"];

  return (
    <section className="h-auto lg:h-[90vh] min-h-145 bg-stone-100 text-slate-900 flex items-center justify-center py-12 lg:py-0">
      <div className="w-full max-w-5xl mx-auto px-6 text-center">
        
        {/* Welcome Pill */}
        {user ? (
          <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-stone-200 text-slate-700 text-sm font-medium mb-6 shadow-sm">
Hello, <span className="text-amber-500 font-bold capitalize">{name}</span>          </div>
        ) : (
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold tracking-wide uppercase mb-6">
            Trusted Marketplace
          </span>
        )}

        {/* Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Buy & Sell <span className="text-amber-500">Products</span> <br className="hidden sm:block" />
          Near You
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Discover thousands of pre-owned items from trusted sellers in your area.
          Search by item or location to find exact matches instantly.
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-10 bg-white border border-stone-200 p-2 sm:p-2.5 rounded-2xl sm:rounded-full shadow-lg shadow-stone-200/60 max-w-3xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0">
            
            <div className="flex items-center gap-3 px-4 py-3 w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-stone-200">
              <Search className="text-amber-500 shrink-0" size={20} />
              <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="Search iPhone, Car, Bike..."
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 outline-none text-sm sm:text-base"
              />
            </div>

            <div className="flex items-center gap-3 px-4 py-3 w-full sm:w-1/2">
              <MapPin className="text-amber-500 shrink-0" size={20} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city or zip code..."
                className="w-full bg-transparent text-slate-900 placeholder-slate-400 outline-none text-sm sm:text-base"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3.5 rounded-xl sm:rounded-full flex items-center justify-center gap-2 transition duration-200 shrink-0 shadow-md shadow-amber-500/20"
            >
              <Search size={18} />
              <span>Search</span>
            </button>
          </div>
        </form>

        <div className="mt-8 flex items-center justify-center gap-2 flex-wrap text-sm text-slate-600">
          <span className="flex items-center gap-1 text-slate-400 text-xs uppercase font-bold tracking-wider mr-1">
            <Tag size={13} /> Trending:
          </span>
          {popularProducts.map((product) => (
            <button
              key={product}
              onClick={() => handleTagClick(product)}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-amber-500 hover:text-slate-950 border border-stone-200/80 text-slate-700 shadow-sm transition text-xs font-semibold"
            >
              {product}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}