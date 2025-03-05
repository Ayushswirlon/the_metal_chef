import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

function Footer() {
  return (
    <footer className="relative z-20">
      <div className="glass-effect border-t border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description - Full width on mobile */}
            <div className="md:col-span-2 lg:col-span-1 space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="space-y-4"
              >
                <img src={logo} alt="The Metal Chef Logo" className="h-16" />
                <h3 className="text-2xl font-bold gradient-text">
                  The Metal Chef
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Pioneering the future of aluminum manufacturing with
                  innovation and sustainability.
                </p>
              </motion.div>
            </div>

            {/* Quick Links and Social Links Combined */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-200">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>

              {/* Social Links */}
              <div className="pt-4">
                <h4 className="text-lg font-semibold text-gray-200 mb-3">
                  Connect
                </h4>
                <div className="flex space-x-4">
                  {[
                    { name: "LinkedIn", icon: "🔗" },
                    { name: "Twitter", icon: "🐦" },
                    { name: "Facebook", icon: "👥" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ scale: 1.2, y: -5 }}
                      className="w-8 h-8 rounded-full glass-effect flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact and Office Address */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-200">
                Contact & Office
              </h4>
              <div className="text-gray-400 space-y-3">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2"
                >
                  <span>📞</span>
                  <span>+91 90758 40072</span>
                 
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2"
                >
                  <span>📞</span>
                  <span>+91 70001 72905</span>
                 
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start space-x-2"
                >
                  <span className="mt-1">🏢</span>
                  <span>
                    84, Balaji Vihar
                    <br />
                    Sanver Road
                    <br />
                    Indore
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Plant Address */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-200">
                Plant Address
              </h4>
              <motion.div
                whileHover={{ x: 5 }}
                className="text-gray-400 space-y-2"
              >
                <p className="flex items-start space-x-2">
                  <span className="mt-1">🏭</span>
                  <span>
                    Survey No. 30
                    <br />
                    Gram Jakhya
                    <br />
                    Sanver Road
                    <br />
                    Indore
                  </span>
                </p>
              </motion.div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-4 border-t border-gray-700/30 text-center">
            <p className="text-gray-400">
              © 2024 The Metal Chef. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
