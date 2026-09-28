import {
  Package,
  Handshake,
  Users,
  Star,
  ShoppingBag,
} from "lucide-react";

export default function AnnouncementBar() {
  const stats = [
    {
      icon: Package,
      text: "2,400+ Active Listings",
    },
    {
      icon: Handshake,
      text: "8,200+ Deals Closed",
    },
    {
      icon: Users,
      text: "35,000+ Sellers",
    },
    {
      icon: Star,
      text: "4.9 Avg. Rating",
    },
    {
      icon: ShoppingBag,
      text: "12,400+ Products Sold",
    },
    {
      icon: Handshake,
      text: "8,200+ Successful Deals",
    },
    {
      icon: Users,
      text: "35,000+ Buyers & Sellers",
    },
  ];

  return (
    <div className="w-full overflow-hidden bg-black">
      <marquee
        direction="left"
        behavior="scroll"
        scrollAmount="4"
      >
        <div className="flex items-center w-max">
          {stats.map((item, index) => (
            <StatItem
              key={`first-${index}`}
              item={item}
            />
          ))}

          {/* Duplicate items for continuous scrolling */}
          {stats.map((item, index) => (
            <StatItem
              key={`second-${index}`}
              item={item}
            />
          ))}
        </div>
      </marquee>
    </div>
  );
}

function StatItem({ item }) {
  const Icon = item.icon;

  return (
    <div className="flex items-center shrink-0">
      {/* Item */}
      <div className="flex items-center gap-3 px-8 py-5">
        <Icon className="w-5 h-5 text-yellow-500" />

        <span className="text-sm sm:text-base font-semibold text-stone-300 whitespace-nowrap">
          {item.text}
        </span>
      </div>

      {/* Separator */}
      <div className="h-10 w-px bg-white/10" />
    </div>
  );
}