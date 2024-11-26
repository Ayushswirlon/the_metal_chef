import React from "react";
import { HashLoader } from "react-spinners";
import "../styles/SimpleLoader.css";

const SimpleLoader = () => {
  return (
    <div className="simple-loader">
      <div className="loader-content">
        <HashLoader
          color="#E5E7EB"
          loading={true}
          size={60}
          speedMultiplier={0.9}
        />
        <div className="loader-text">
          <span className="gradient-text">Crafting Excellence</span>
        </div>
      </div>
    </div>
  );
};

export default SimpleLoader;
