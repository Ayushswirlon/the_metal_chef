import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SimpleLoader from "./components/SimpleLoader";
import FloatingNav from "./components/FloatingNav";
import "./index.css";

// Lazy load components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  return (
    <Router>
      <div className="min-h-screen text-white relative overflow-hidden">
        <div className="fixed inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />

        <div className="relative z-10">
          <Suspense fallback={<SimpleLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
            <FloatingNav />
            <Footer />
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
