import React from "react";
import { motion } from "framer-motion";

const Spinner: React.FC = () => {
  const dotCount = 3;
  const radius = 30;
  const duration = 1.2;

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24  flex items-center justify-center">
      {Array.from({ length: dotCount }).map((_, i) => {
        const initialRotate = (360 / dotCount) * i;
        return (
          <motion.div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "#EA580C",
              position: "absolute",
              top: "50%",
              left: "50%",
              transformOrigin: `-${radius}px center`, // orbit around center
              transform: `rotate(${initialRotate}deg) translateX(${radius}px)`,
            }}
            animate={{ rotate: initialRotate + 360 }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: duration,
              repeatType: "loop",
            }}
          />
        );
      })}
    </div>
  );
};

export default Spinner;
