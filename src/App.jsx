import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
import Create from "./components/Create";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-50 w-full overflow-x-hidden text-slate-800 font-sans">
      <Navbar />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Routes>     
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
