import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../Utils/Context";

const Navbar = () => {
  const [products] = useContext(ProductContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get("category");

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  let distinct_cat =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_cat = [...new Set(distinct_cat)];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tight text-indigo-600 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="hidden sm:inline">Storefront</span>
        </Link>

        {/* Categories (Desktop mostly, scrollable on mobile) */}
        <div className="hidden md:flex flex-1 justify-center px-8 overflow-x-auto no-scrollbar">
          <div className="flex gap-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                !currentCategory
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
              }`}
            >
              All
            </Link>
            {distinct_cat &&
              distinct_cat.map((c, i) => (
                <Link
                  to={`/?category=${c}`}
                  key={i}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap capitalize ${
                    currentCategory === c
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                  }`}
                >
                  {c}
                </Link>
              ))}
          </div>
        </div>

        {/* Action Button */}
        <Link
          to="/create"
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 hover:shadow-indigo-500/30 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <span className="mr-2 hidden sm:inline">Add Product</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>

      {/* Mobile Categories (Scrollable below nav) */}
      <div className="md:hidden w-full overflow-x-auto no-scrollbar px-4 pt-3 pb-2 flex gap-2 border-t border-slate-100 mt-2">
        <Link
          to="/"
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
            !currentCategory
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All
        </Link>
        {distinct_cat &&
          distinct_cat.map((c, i) => (
            <Link
              to={`/?category=${c}`}
              key={i}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap capitalize ${
                currentCategory === c
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {c}
            </Link>
          ))}
      </div>
    </nav>
  );
};

export default Navbar;
