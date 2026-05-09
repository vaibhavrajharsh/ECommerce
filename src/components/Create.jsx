import React, { useState } from "react";
import axios from "../utils/axios";
import { useNavigate, Link } from "react-router-dom";

const Create = () => {
  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    image: "", // Added image field since other products have images
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/products", product);
      alert("✅ Product added successfully!");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to add product");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-in fade-in duration-500">
      <Link to="/" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Products
      </Link>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="bg-indigo-600 px-8 py-10 text-center relative overflow-hidden">
          {/* Decorative background circle */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-indigo-500 rounded-full opacity-50 blur-2xl"></div>
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-indigo-700 rounded-full opacity-50 blur-2xl"></div>
          
          <h2 className="relative z-10 text-3xl font-bold text-white mb-2">Add New Product</h2>
          <p className="relative z-10 text-indigo-100">Fill in the details below to add a new item to the store.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Product Title</label>
              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                required
                placeholder="e.g. Premium Wireless Headphones"
                className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>

            {/* Grid for Category and Price */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <input
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  placeholder="e.g. electronics"
                  className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    required
                    placeholder="0.00"
                    step="0.01"
                    className="w-full border border-slate-300 pl-8 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
              <input
                type="url"
                name="image"
                value={product.image}
                onChange={handleChange}
                required
                placeholder="https://example.com/image.jpg"
                className="w-full border border-slate-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                required
                placeholder="Describe the product features, specifications, and benefits..."
                className="w-full border border-slate-300 px-4 py-3 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]"
            >
              Add Product to Store
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
