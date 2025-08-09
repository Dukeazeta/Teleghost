"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function Reveal({
  children,
  delay = 0,
  y = 20,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { delay, duration: 0.6, ease: "easeOut" } });
  }, [controls, delay]);

  return (
    <motion.div initial={{ opacity: 0, y }} animate={controls}>
      {children}
    </motion.div>
  );
}

