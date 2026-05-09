import axios from "../utils/axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "./Loader";

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);

  return product ? (
    <div className="w-full animate-in fade-in duration-500">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Products
      </Link>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 bg-slate-50 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full max-w-sm h-auto object-contain mix-blend-multiply drop-shadow-xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full uppercase tracking-wider mb-4 w-max">
            {product.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            {product.title}
          </h1>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-3xl font-bold text-indigo-600">${product.price}</h2>
            <div className="flex items-center text-amber-400 text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-slate-600 font-medium">4.5 (128 reviews)</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-slate-100">
            <button className="flex-1 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex justify-center items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Buy Now
            </button>
            <button className="flex-1 bg-white text-indigo-600 border border-indigo-200 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 hover:border-indigo-300 transition-all active:scale-[0.98] flex justify-center items-center gap-2">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default Details;
