import React, { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from "motion/react"; // Make sure to use 'framer-motion'
export default function Cursor() {
    const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Apply Spring config for smooth trailing effect
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    // We attach listener to window to track mouse anywhere on screen
    const manageMouseMove = (e) => {
      // 20px is subtracted to keep the 40x40 circle perfectly centered on cursor point
      mouseX.set(e.clientX - 20); 
      mouseY.set(e.clientY - 20);
    };

    window.addEventListener("mousemove", manageMouseMove);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
    };
  }, [mouseX, mouseY]);
  return (
    <motion.div
            style={{
              x: springX, // using spring values
              y: springY, // using spring values
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="
              mix-blend-multiply
              fixed
              md:block
              lg:block
              sm:hidden
              hidden
              top-0
              left-0
              pointer-events-none
              z-50
              h-10
              w-10
              rounded-full
              bg-[#BEA163]
            "
          />
  )
}
