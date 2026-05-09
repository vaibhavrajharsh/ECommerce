import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loader from "./Loader";
import axios from "../utils/axios";

const Home = () => {
  const [products] = useContext(ProductContext);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const category = query.get("category"); // null if not present
  const [filteredProducts, setFilteredProducts] = useState(null);

  const getProductsCategory = async () => {
    try {
      const { data } = await axios.get(`products/category/${category}`);
      setFilteredProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (category) {
      getProductsCategory();
    } else {
      setFilteredProducts(products);
    }
  }, [category, products]);

  return products ? (
    <div className="w-full animate-in fade-in duration-500">
      {/* Optional Hero Section */}
      {!category && (
        <div className="mb-12 rounded-3xl bg-indigo-600 px-6 py-16 sm:p-16 flex flex-col items-center text-center shadow-xl shadow-indigo-200">
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">Welcome to Storefront</h1>
          <p className="text-indigo-100 max-w-2xl text-lg">Discover our premium collection of products curated just for you. Quality guaranteed.</p>
        </div>
      )}
      
      {category && (
        <div className="mb-8 flex items-center gap-3">
          <h2 className="text-3xl font-bold capitalize text-slate-800">{category}</h2>
          <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">{filteredProducts?.length || 0} items</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
        {filteredProducts &&
          filteredProducts.map((p, i) => (
            <Link
              to={`/details/${p.id}`}
              key={i}
              className="group flex flex-col bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100"
            >
              <div className="relative w-full aspect-square mb-4 bg-slate-50 rounded-xl overflow-hidden p-6 flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-xs font-medium text-indigo-600 mb-1 capitalize tracking-wide">{p.category}</span>
                <h1 className="text-sm font-semibold text-slate-800 line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">{p.title}</h1>
                <div className="mt-auto pt-2 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">${p.price}</h2>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Home;
