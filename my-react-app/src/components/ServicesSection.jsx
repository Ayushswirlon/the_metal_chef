import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceDetailModal } from "./ServiceDetailModal";

// Import service images
import Aluminium_ingot from "../assets/Aluminium_ingot.jpg";
import Aluminium_Scrap from "../assets/Aluminium_Scrap.jpg";
import Metal from "../assets/Metal.jpg";
import Quality from "../assets/Quality.jpg";
import Sustainable from "../assets/Sustainable.jpg";
import Custom from "../assets/Custom.jpg";

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null);
  const scrollRef = useRef(null);

  // Services data
  const services = useMemo(
    () => [
      {
        id: 1,
        title: "Aluminum Ingot Manufacturing",
        description:
          "Premium quality aluminum ingots with precise composition control.",
        icon: "🏭",
        image: Aluminium_ingot,
        detailedDescription: `
        Precision engineering in aluminum ingot production:
        • Highest purity levels (99.7% aluminum content)
        • Consistent chemical composition
        • Advanced casting techniques
        • Rigorous quality control
      `,
        keyFeatures: [
          "99.7% Purity",
          "Consistent Composition",
          "Advanced Casting",
        ],
      },
      {
        id: 2,
        title: "Scrap Metal Collection",
        description:
          "Efficient and environmentally responsible metal scrap collection.",
        icon: "♻️",
        image: Aluminium_Scrap,
        detailedDescription: `
        Comprehensive scrap metal collection services:
        • Nationwide collection network
        • Competitive pricing
        • Sustainable recycling practices
        • Efficient logistics
      `,
        keyFeatures: [
          "Nationwide Coverage",
          "Competitive Rates",
          "Eco-friendly Approach",
          "Professional Handling",
        ],
      },
      {
        id: 3,
        title: "Metal Processing",
        description:
          "State-of-the-art processing facilities for various grades of aluminum scrap.",
        icon: "⚙️",
        image: Metal,
        detailedDescription: `
        Advanced metal processing capabilities:
        • Cutting-edge sorting technologies
        • Precision melting and refining
        • Quality assurance at every stage
        • Customized processing solutions
      `,
        keyFeatures: [
          "Advanced Sorting",
          "Precision Melting",
          "Quality Control",
          "Customized Solutions",
        ],
      },
      {
        id: 4,
        title: "Quality Testing",
        description:
          "Advanced laboratory testing ensuring highest quality standards.",
        icon: "🔍",
        image: Quality,
        detailedDescription: `
        Comprehensive quality testing protocols:
        • Spectroscopic analysis
        • Mechanical property testing
        • Chemical composition verification
        • Continuous quality monitoring
      `,
        keyFeatures: [
          "Spectroscopic Analysis",
          "Mechanical Testing",
          "Chemical Verification",
          "Continuous Monitoring",
        ],
      },
      {
        id: 5,
        title: "Sustainable Practices",
        description:
          "Eco-friendly recycling processes with minimal environmental impact.",
        icon: "🌱",
        image: Sustainable,
        detailedDescription: `
        Our commitment to sustainability:
        • Reduced carbon footprint
        • Energy-efficient processes
        • Circular economy principles
        • Minimal waste generation
      `,
        keyFeatures: [
          "Carbon Footprint Reduction",
          "Energy Efficiency",
          "Circular Economy",
          "Waste Minimization",
        ],
      },
      {
        id: 6,
        title: "Custom Solutions",
        description:
          "Tailored metal processing solutions for specific industry needs.",
        icon: "⚡",
        image: Custom,
        detailedDescription: `
        Bespoke metal processing solutions:
        • Industry-specific customization
        • Collaborative approach
        • Innovative problem-solving
        • Flexible manufacturing
      `,
        keyFeatures: [
          "Industry-Specific Design",
          "Collaborative Approach",
          "Innovative Solutions",
          "Flexible Manufacturing",
        ],
      },
    ],
    []
  );

  // Smooth scroll effect
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrameId;
    const autoScroll = () => {
      container.scrollLeft += 1;

      // Reset scroll when reaching end
      if (
        container.scrollLeft >=
        container.scrollWidth - container.clientWidth
      ) {
        container.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Service Card Component
  const ServiceCard = ({ service, onClick }) => (
    <div
      className="flex-shrink-0 w-[300px] md:w-[400px] 
        bg-zinc-800 rounded-2xl overflow-hidden 
        shadow-lg cursor-pointer 
        transition-transform duration-300 
        hover:scale-105"
      onClick={() => onClick(service)}
    >
      <div className="relative h-[250px] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 bg-black bg-opacity-40 
          flex flex-col justify-end p-6 text-white"
        >
          <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-300 text-sm">{service.description}</p>
      </div>
    </div>
  );

  return (
    <div className="py-24 bg-zinc-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold 
            text-white mb-4"
          >
            Our Services
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Innovative solutions tailored to your metal processing needs
          </p>
        </div>

        {/* Services Carousel */}
        <div ref={scrollRef} className="overflow-x-scroll scrollbar-hide">
          <div className="flex space-x-6 pb-8 inline-flex">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onClick={setSelectedService}
              />
            ))}
          </div>
        </div>

        {/* Service Detail Modal */}
        <AnimatePresence>
          {selectedService && (
            <ServiceDetailModal
              service={selectedService}
              onClose={() => setSelectedService(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ServicesSection;
