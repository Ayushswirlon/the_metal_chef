import React, { useEffect } from "react";
import { motion } from "framer-motion";
import HappyWorkers from "../assets/Happy_Workers.jpeg"
function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative z-10 pt-16">
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4"
        >
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6 mb-20"
          >
            <span className="text-gray-400 uppercase tracking-wider">
              ABOUT US
            </span>
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
              THE METAL CHEF
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto"></div>
            <span className="block text-xl text-gray-300">
              Pioneering Aluminum Excellence
            </span>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Crafting Premium Aluminum Solutions for a Sustainable Future
            </p>
          </motion.div>

          {/* Content Section */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(255,255,255,0.2)",
                }}
                src={HappyWorkers}
                alt="Factory Interior"
                className="rounded-2xl w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
                Our Legacy of Innovation
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  At{" "}
                  <span className="text-white font-semibold">
                    The Metal Chef
                  </span>
                  , we've mastered the art of aluminum manufacturing through
                  decades of innovation and expertise.
                </p>
                <p>
                  Our signature cuboid aluminum ingots represent the pinnacle of
                  precision engineering, combining cutting-edge technology with
                  sustainable practices.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 pt-6">
                {[
                  { number: "1000+", label: "Happy Customers" },
                  { number: "500+", label: "Tons Annual Production" },
                  { number: "99.9%", label: "Purity Achieved" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-4 rounded-xl backdrop-blur-sm border border-gray-700/30 text-center"
                  >
                    <span className="block text-2xl font-bold text-white mb-1">
                      {stat.number}
                    </span>
                    <span className="text-sm text-gray-400">{stat.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="py-12"
          >
            <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
              Why Choose Us
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Premium Quality",
                  desc: "Setting new standards with industry-leading purity and precision",
                },
                {
                  title: "Sustainable Practice",
                  desc: "Committed to eco-friendly production and minimal environmental impact",
                },
                {
                  title: "Custom Solutions",
                  desc: "Tailored specifications meeting exact client requirements",
                },
                {
                  title: "Global Reach",
                  desc: "Trusted partner to industries worldwide with reliable logistics",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow: "0 0 30px rgba(255,255,255,0.1)",
                  }}
                  className="bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-6 rounded-xl backdrop-blur-sm border border-gray-700/30"
                >
                  <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;
