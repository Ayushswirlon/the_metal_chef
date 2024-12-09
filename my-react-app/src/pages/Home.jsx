import React, {
  useMemo,
  useCallback,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { usePerformanceOptimizations } from "../hooks/usePerformanceOptimizations";
import { LazyImage } from "../components/LazyImage";
import "../index.css";
import AnimatedCounter from "../components/AnimatedCounter";
import logo from "../assets/logo.png";
import Aluminium_ingot from "../assets/Aluminium_ingot.jpg";
import Metal from "../assets/Metal.jpg";
import Custom from "../assets/Custom.jpg";
import Sustainable from "../assets/Sustainable.jpg";
import Quality from "../assets/Quality.jpg";
import Aluminium_Scrap from "../assets/Aluminium_Scrap.jpg";

// Extracted components for better performance
const ServiceCard = React.memo(({ service, index }) => (
  <div className="flex-shrink-0 w-[300px] md:w-[400px] group">
    <div className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-8 rounded-2xl backdrop-blur-sm border border-gray-700/30 shadow-2xl transition-all duration-300 group-hover:border-gray-500/50 h-full">
      {/* Image container */}
      <div className="relative w-full h-48 mb-6 overflow-hidden rounded-xl bg-gradient-to-br from-zinc-700/30 to-zinc-800/30">
        {service.image ? (
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl transform group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300 group-hover:from-white group-hover:to-gray-200 transition-all duration-300">
          {service.title}
        </h3>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {service.description}
        </p>
      </div>
    </div>
  </div>
));

const StatCard = React.memo(({ stat, index, shouldReduceMotion }) => (
  <motion.div
    key={index}
    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
    whileInView={
      shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
    }
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

// AutoScroll component with optimized performance
const AutoScroll = React.memo(({ children }) => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let lastTime = null;
    let animationId;

    const animate = (currentTime) => {
      if (!lastTime) lastTime = currentTime;
      const delta = currentTime - lastTime;

      if (!isDragging && !isPaused && scrollContainer) {
        scrollContainer.scrollLeft += (0.5 * delta) / 8;

        if (
          scrollContainer.scrollLeft >=
          scrollContainer.scrollWidth - scrollContainer.clientWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }

      lastTime = currentTime;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isDragging, isPaused]);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
    setIsDragging(false);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="overflow-x-hidden relative cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
});

function Home() {
  const { shouldReduceMotion, isMobile } = usePerformanceOptimizations();
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  // Memoized handlers

  // Memoized map options
  const mapOptions = useMemo(
    () => ({
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
    }),
    [isMobile]
  );

  // Memoize static data

  const services = useMemo(
    () => [
      {
        title: "Aluminum Ingot Manufacturing",
        description:
          "Premium quality aluminum ingots with precise composition control and industry-leading purity levels. Our state-of-the-art facilities ensure consistent quality.",
        icon: "🏭",
        image: Aluminium_ingot, // Prepared for future image integration
      },
      {
        title: "Scrap Collection",
        description:
          "Professional aluminum scrap collection service with efficient logistics and fair pricing. We handle everything from industrial waste to consumer recycling.",
        icon: "♻️",
        image: Aluminium_Scrap,
      },
      {
        title: "Metal Processing",
        description:
          "State-of-the-art processing facilities for various grades of aluminum scrap. Our advanced technology ensures maximum recovery and minimal waste.",
        icon: "⚙️",
        image: Metal,
      },
      {
        title: "Quality Testing",
        description:
          "Advanced laboratory testing ensuring highest quality standards. Every batch undergoes rigorous testing to meet international specifications.",
        icon: "🔍",
        image: Quality,
      },
      {
        title: "Sustainable Practices",
        description:
          "Eco-friendly recycling processes with minimal environmental impact. We're committed to reducing our carbon footprint while maximizing efficiency.",
        icon: "🌱",
        image: Sustainable,
      },
      {
        title: "Custom Solutions",
        description:
          "Tailored metal processing solutions for specific industry needs. Our experts work with you to develop the perfect solution for your requirements.",
        icon: "⚡",
        image: Custom,
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

  const servicesContainerRef = useRef(null);
  const { scrollXProgress } = useScroll({
    container: servicesContainerRef,
  });

  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Quadruple the services array for smoother infinite scroll
  const repeatedServices = useMemo(
    () => [...services, ...services, ...services, ...services],
    [services]
  );

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
            background:
              "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)",
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
              initial={
                shouldReduceMotion ? { opacity: 1 } : { scale: 0.9, opacity: 0 }
              }
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0.3 : 0.8,
                type: "spring",
                stiffness: shouldReduceMotion ? 50 : 100,
              }}
              className="mb-2"
            >
              <img
                src={logo}
                alt="The Metal Chef Logo"
                className="h-24 mx-auto"
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
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            whileInView={
              shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }
            }
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
        <div className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 px-4">
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
                Our Services
              </h2>
              <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto">
                Explore our comprehensive solutions
              </p>
            </div>

            {/* Services Carousel with Auto Scroll and Drag Support */}
            <div className="relative">
              <AutoScroll>
                <div className="flex space-x-6 px-4 pb-8">
                  {repeatedServices.map((service, index) => (
                    <ServiceCard
                      key={`${service.title}-${index}`}
                      service={service}
                      index={index}
                    />
                  ))}
                </div>
              </AutoScroll>

              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-900 to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-900 to-transparent pointer-events-none" />
            </div>

            {/* Interaction Hint */}
            <div className="text-center mt-6">
              <p className="text-gray-400 text-sm">
                Hover to pause • Drag to explore
              </p>
            </div>
          </div>
        </div>

        {/* Visit Our Facility Section */}
        <div className="py-16 px-4">
          <motion.h2
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
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
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: -50 }
                }
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
                initial={
                  shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 50 }
                }
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
