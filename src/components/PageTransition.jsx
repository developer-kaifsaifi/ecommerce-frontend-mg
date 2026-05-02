import { motion } from "motion/react";

export default function PageTransition({ children }) {
  return (
    <motion.div
      // Initial state: page load hone se pehle (thoda neeche aur transparent)
      initial={{ opacity: 0, y: 20 }}
      
      // Animate state: page load hone ke baad (apni asli jagah par aur visible)
      animate={{ opacity: 1, y: 0 }}
      
      // Exit state: page chhodte waqt (thoda upar aur fade out)
      exit={{ opacity: 0, y: -20 }}
      
      // Transition settings
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}