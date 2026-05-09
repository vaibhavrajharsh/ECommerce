import React from "react";

const Loader = () => {
  return (
    <div className="w-full min-h-[50vh] flex flex-col justify-center items-center gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
        <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
      </div>
      <h1 className="text-xl font-medium text-slate-500 animate-pulse tracking-wide">Loading...</h1>
    </div>
  );
};

export default Loader;
