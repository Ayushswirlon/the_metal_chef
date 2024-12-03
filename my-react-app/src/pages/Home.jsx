import React, { useMemo, useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { usePerformanceOptimizations } from "../hooks/usePerformanceOptimizations";
import { LazyImage } from "../components/LazyImage";
import "../index.css";
import AnimatedCounter from "../components/AnimatedCounter";

// Extracted components for better performance
const ServiceCard = React.memo(({ service, index, shouldReduceMotion }) => (
  <motion.div
    key={index}
    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 50 }}
    whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
    transition={{ delay: shouldReduceMotion ? 0 : index * 0.1 }}
    whileHover={shouldReduceMotion ? {} : { y: -10, scale: 1.02 }}
    className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/30 shadow-2xl group hardware-accelerated contain-content"
  >
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
      {service.icon}
    </div>
    <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
      {service.title}
    </h3>
    <p className="text-gray-400 leading-relaxed">{service.description}</p>
  </motion.div>
));

const StatCard = React.memo(({ stat, index, shouldReduceMotion }) => (
  <motion.div
    key={index}
    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
    whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
    transition={{ delay: shouldReduceMotion ? 0 : index * 0.1 }}
    className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 rounded-2xl backdrop-blur-sm border border-gray-700/30 text-center group hover:border-gray-500/50 transition-all duration-300 contain-content"
  >
    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
      {stat.icon}
    </div>
    <div className="text-3xl font-bold text-white mb-2">
      <AnimatedCounter value={stat.number} />
      <span className="text-gray-300 text-xl ml-1">
        {stat.number.includes("+") ? "+" : ""}
        {stat.number.includes("%") ? "%" : ""}
      </span>
    </div>
    <p className="text-gray-400 mt-2">{stat.label}</p>
  </motion.div>
));

function Home() {
  const { shouldReduceMotion, isMobile } = usePerformanceOptimizations();
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  // Memoized handlers
  const handleDiscoverClick = useCallback(() => {
    // Implement your click handler
  }, []);

  // Memoized map options
  const mapOptions = useMemo(() => ({
    disableDefaultUI: isMobile,
    zoomControl: !isMobile,
    styles: [
      {
        featureType: "all",
        elementType: "geometry",
        stylers: [{ color: "#242f3e" }],
      },
      // ... other styles
    ],
  }), [isMobile]);

  // Memoize static data
  const companies = useMemo(
    () => [
      {
        name: "MetalTech Solutions",
        logo: "https://assets.website-files.com/64060ad81a09c81fe88f0df8/64060c7dfb3d0c4ab82b7046_Logo-white.svg",
      },
      {
        name: "Precision Alloys",
        logo: "https://assets.website-files.com/64060ad81a09c81fe88f0df8/64060c7d7d5b0c0d594f6f13_Logo-white.svg",
      },
      {
        name: "IndustrialForge",
        logo: "https://assets.website-files.com/64060ad81a09c81fe88f0df8/64060c7d1a09c8b0c68f1377_Logo-white.svg",
      },
      {
        name: "NextGen Metals",
        logo: "https://assets.website-files.com/64060ad81a09c81fe88f0df8/64060c7d6c1c8a012e06e1b1_Logo-white.svg",
      },
      {
        name: "EcoMetal Dynamics",
        logo: "https://assets.website-files.com/64060ad81a09c81fe88f0df8/64060c7d7c8d708c86a91f17_Logo-white.svg",
      },
      {
        name: "AlphaCore Industries",
        logo: "https://assets.website-files.com/64060ad81a09c81fe88f0df8/64060c7d1a09c868968f1376_Logo-white.svg",
      },
      {
        name: "SteelTech Pro",
        logo: "https://assets.website-files.com/64060ad81a09c81fe88f0df8/64060c7d6c1c8a3d7e06e1b0_Logo-white.svg",
      },
      {
        name: "MetalWorks Global",
        logo: "https://assets.website-files.com/64060ad81a09c81fe88f0df8/64060c7d7d5b0c0d594f6f13_Logo-white.svg",
      },
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        title: "Aluminum Ingot Manufacturing",
        description:
          "Premium quality aluminum ingots with precise composition control and industry-leading purity levels.",
        icon: "🏭",
      },
      {
        title: "Scrap Collection",
        description:
          "Professional aluminum scrap collection service with efficient logistics and fair pricing.",
        icon: "♻️",
      },
      {
        title: "Metal Processing",
        description:
          "State-of-the-art processing facilities for various grades of aluminum scrap.",
        icon: "⚙️",
      },
      {
        title: "Quality Testing",
        description:
          "Advanced laboratory testing ensuring highest quality standards.",
        icon: "🔍",
      },
      {
        title: "Sustainable Practices",
        description:
          "Eco-friendly recycling processes with minimal environmental impact.",
        icon: "🌱",
      },
      {
        title: "Custom Solutions",
        description:
          "Tailored metal processing solutions for specific industry needs.",
        icon: "⚡",
      },
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [services.length]);

  // Optimize motion variants based on device capabilities
  const motionProps = useMemo(
    () => ({
      initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.8,
        delay: shouldReduceMotion ? 0 : 0.2,
      },
    }),
    [shouldReduceMotion]
  );

  // Optimize hover effects
  const hoverProps = useMemo(
    () => ({
      whileHover: shouldReduceMotion
        ? {}
        : {
            scale: 1.05,
            boxShadow: "0 0 30px rgba(255,255,255,0.2)",
          },
    }),
    [shouldReduceMotion]
  );

  // Map configuration
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    // Load maps API only when needed
    loadingElement: <div>Loading...</div>,
  });

  const mapCenter = useMemo(() => ({ lat: 28.7041, lng: 77.1025 }), []);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Main background with CSS containment */}
      <div className="fixed inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 contain-paint" />

      {/* Optimized ambient glow with CSS containment */}
      <div className="fixed inset-0 contain-paint">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: isMobile ? "120vw" : "140vw",
            height: isMobile ? "120vh" : "140vh",
            background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)",
            filter: isMobile ? "blur(60px)" : "blur(90px)",
            contain: "strict",
          }}
        />
      </div>

      {/* Content container */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 relative">
          <motion.div {...motionProps} className="text-center space-y-4">
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 0.8,
                type: "spring",
                stiffness: shouldReduceMotion ? 50 : 100,
              }}
              className="mb-2"
            >
              <img 
                src="/src/assets/The Metal Chef Logo.png"
                alt="The Metal Chef Logo"
                className="h-48 md:h-64 w-auto mx-auto"
              />
            </motion.div>

            <motion.div className="relative inline-block">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 pb-2 relative z-10">
                The Metal Chef
              </h1>
              <div className="absolute -inset-2 bg-gradient-to-r from-gray-500 to-gray-300 opacity-10 blur-2xl rounded-full"></div>
            </motion.div>

            <motion.p
              initial={
                shouldReduceMotion ? { opacity: 1 } : { y: 20, opacity: 0 }
              }
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.3,
                duration: shouldReduceMotion ? 0.3 : 0.8,
              }}
              className="text-2xl text-gray-300 max-w-3xl mx-auto font-light tracking-wide"
            >
              Crafting Excellence in Aluminum • Transforming Metal into
              Masterpieces
            </motion.p>

            <motion.button
              {...hoverProps}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              className="relative overflow-hidden rounded-full group hardware-accelerated"
            >
              <span className="relative z-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 text-zinc-900 px-8 py-4 rounded-full font-semibold inline-block transition-all duration-300">
                Discover Our Craft
              </span>
              <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 1,
              duration: shouldReduceMotion ? 0.3 : 1,
            }}
            className="absolute bottom-10"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-2"
            >
              <motion.div className="w-1 h-1 bg-gray-400 rounded-full" />
            </motion.div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="py-32 px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Premium Ingots",
                description:
                  "Masterfully crafted aluminum ingots that set industry benchmarks for excellence and purity",
              },
              {
                title: "Expert Recycling",
                description:
                  "State-of-the-art aluminum scrap processing with precision and environmental consciousness",
              },
              {
                title: "Sustainable Future",
                description:
                  "Pioneering eco-friendly practices that transform today's waste into tomorrow's resources",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 50 }
                }
                whileInView={
                  shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 1, y: 0 }
                }
                viewport={{ once: true }}
                transition={{
                  duration: shouldReduceMotion ? 0.3 : 0.8,
                  delay: shouldReduceMotion ? 0 : index * 0.2,
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -10,
                        transition: {
                          duration: shouldReduceMotion ? 0.3 : 0.3,
                        },
                      }
                }
                className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/30 shadow-2xl hover:border-gray-600/50 transition-all duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Replace Companies Section with Achievements */}
        <div className="py-16 px-4">
          {/* Achievements Counter Section */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.8 }}
          >
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
              Our Impact in Numbers
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "10000+", label: "Happy Customers", icon: "😊" },
                { number: "50000+", label: "Tons Produced", icon: "🏭" },
                { number: "99.9", label: "Quality Score", icon: "⭐" },
                { number: "25+", label: "Years of Excellence", icon: "🏆" },
              ].map((stat, index) => (
                <StatCard
                  key={stat.label}
                  stat={stat}
                  index={index}
                  shouldReduceMotion={shouldReduceMotion}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Services Section */}
        <div className="py-16 px-4">
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.3 : 0.8 }}
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300"
          >
            Our Services
          </motion.h2>

          {/* Service Scroller */}
          <div className="max-w-3xl mx-auto relative">
            {/* Left Arrow */}
            <button
              onClick={() => setCurrentServiceIndex((prev) => 
                prev === 0 ? services.length - 1 : prev - 1
              )}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 text-white/70 hover:text-white transition-colors"
              aria-label="Previous service"
            >
              <motion.div
                whileHover={{ x: -5 }}
                className="bg-zinc-800/50 p-3 rounded-full backdrop-blur-sm border border-gray-700/30"
              >
                ←
              </motion.div>
            </button>

            {/* Service Content */}
            <motion.div
              key={currentServiceIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/30 shadow-2xl group hardware-accelerated contain-content"
            >
              <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform">
                {services[currentServiceIndex].icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
                {services[currentServiceIndex].title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-center text-lg">
                {services[currentServiceIndex].description}
              </p>
            </motion.div>

            {/* Right Arrow */}
            <button
              onClick={() => setCurrentServiceIndex((prev) => 
                (prev + 1) % services.length
              )}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 text-white/70 hover:text-white transition-colors"
              aria-label="Next service"
            >
              <motion.div
                whileHover={{ x: 5 }}
                className="bg-zinc-800/50 p-3 rounded-full backdrop-blur-sm border border-gray-700/30"
              >
                →
              </motion.div>
            </button>
          </div>
        </div>

        {/* Visit Our Facility Section */}
        <div className="py-16 px-4">
          <motion.h2
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300"
          >
            Visit Our Facility
          </motion.h2>

          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Map Section */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="h-[400px] rounded-2xl overflow-hidden border border-gray-700/30"
              >
                {isLoaded && (
                  <GoogleMap
                    zoom={15}
                    center={mapCenter}
                    mapContainerClassName="w-full h-full"
                    options={mapOptions}
                  >
                    <Marker position={mapCenter} />
                  </GoogleMap>
                )}
              </motion.div>

              {/* Address Information */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/30 h-[400px] flex flex-col justify-center"
              >
                <div className="space-y-8">
                  {/* Office Address */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <span>🏢</span> Office Address
                    </h3>
                    <div className="text-gray-300 ml-8">
                      <p>84, Balaji Vihar</p>
                      <p>Sanver Road</p>
                      <p>Indore</p>
                    </div>
                  </div>

                  {/* Plant Address */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <span>🏭</span> Plant Address
                    </h3>
                    <div className="text-gray-300 ml-8">
                      <p>Survey No. 30</p>
                      <p>Gram Jakhya</p>
                      <p>Sanver Road</p>
                      <p>Indore</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <span>📞</span> Contact Us
                    </h3>
                    <div className="text-gray-300 ml-8 space-y-2">
                      <p className="flex items-center gap-2">
                        <span>📞</span> +91 90758 40072
                      </p>
                      <p className="flex items-center gap-2">
                        <span>✉️</span> contact@metalchef.com
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay gradient for depth */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-zinc-900/50" />
    </div>
  );
}

export default React.memo(Home);
