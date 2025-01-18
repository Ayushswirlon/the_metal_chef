import React, { useEffect } from "react";
import { motion } from "framer-motion";

export const ServiceDetailModal = ({ service, onClose }) => {
  if (!service) return null;

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-zinc-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          {/* Image Section */}
          <div className="relative h-96">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover rounded-l-2xl"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h2 className="text-3xl font-bold text-white">{service.title}</h2>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8 space-y-6 bg-zinc-900">
            <div className="text-6xl mb-4 opacity-70">{service.icon}</div>

            <p className="text-gray-300 mb-6">{service.description}</p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Detailed Description
              </h3>
              <p className="text-gray-400 whitespace-pre-line">
                {service.detailedDescription}
              </p>
            </div>

            {service.keyFeatures && (
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Key Features
                </h3>
                <ul className="space-y-2 text-gray-300">
                  {service.keyFeatures.map((feature, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center"
                    >
                      <span className="mr-2 text-green-500">✓</span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="mt-6 bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-2 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all"
            >
              Close
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
