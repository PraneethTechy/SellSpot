import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-stone-300 border-t border-neutral-800/80 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-extrabold tracking-tight">
                <span className="text-white">Sell</span>
                <span className="text-amber-400">Spot</span>
              </h2>
            </Link>

            <p className="text-sm leading-relaxed text-stone-400 max-w-sm">
              Buy and sell products with trusted people in your city. Discover
              amazing deals and connect with local buyers and sellers.
            </p>
          </div>

        <div>
            <h3 className="text-white font-semibold mb-5 tracking-wider uppercase text-xs">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link 
                to="/" 
                className="hover:text-amber-400 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1 w-fit group"
              >
                <span>Home</span>
              </Link>

              <Link 
                to="/dashboard" 
                className="hover:text-amber-400 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1 w-fit group"
              >
                <span>Dashboard</span>
              </Link>

              <Link
                to="/dashboard/messages"
                className="hover:text-amber-400 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1 w-fit group"
              >
                <span>Messages</span>
              </Link>

              <Link
                to="/add-product"
                className="hover:text-amber-400 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1 w-fit group text-amber-400/90 font-medium"
              >
                <span>Sell Item</span>
                <ArrowUpRight size={14} className="opacity-70 group-hover:opacity-100 transition" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-5 tracking-wider uppercase text-xs">
              Categories
            </h3>

            <div className="flex flex-col gap-2.5 text-sm text-stone-400">
              <span className="hover:text-stone-200 transition cursor-default">Electronics</span>
              <span className="hover:text-stone-200 transition cursor-default">Mobiles</span>
              <span className="hover:text-stone-200 transition cursor-default">Furniture</span>
              <span className="hover:text-stone-200 transition cursor-default">Vehicles</span>
              <span className="hover:text-stone-200 transition cursor-default">Fashion</span>
            </div>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="text-white font-semibold mb-5 tracking-wider uppercase text-xs">
              Contact
            </h3>

            <div className="space-y-3.5 text-sm">
              <div className="flex items-center gap-3 text-stone-300">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-amber-400">
                  <MapPin size={15} />
                </div>
                <span>Tirupati, India</span>
              </div>

              <div className="flex items-center gap-3 text-stone-300">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-amber-400">
                  <Phone size={15} />
                </div>
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3 text-stone-300">
                <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 text-amber-400">
                  <Mail size={15} />
                </div>
                <span>support@sellspot.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 text-stone-400 hover:text-white hover:bg-amber-500 hover:border-amber-500 flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <FaFacebookF size={15} />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 text-stone-400 hover:text-white hover:bg-amber-500 hover:border-amber-500 flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <FaInstagram size={15} />
              </a>

              <a
                href="#"
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 text-stone-400 hover:text-white hover:bg-amber-500 hover:border-amber-500 flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <FaLinkedinIn size={15} />
              </a>
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-neutral-900 bg-neutral-950/80">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} SellSpot. All Rights Reserved.</p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-amber-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-amber-400 transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}