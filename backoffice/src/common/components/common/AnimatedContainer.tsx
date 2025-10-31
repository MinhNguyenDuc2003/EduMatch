"use client";

import { motion } from "framer-motion";
import { cn } from "src/utils/cn";

export default function AnimatedContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      animate={{ marginLeft: '10rem' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'flex flex-1 flex-col min-h-screen transition-all duration-500 ease-in-out overflow-y-auto bg-customgreys-secondarybg'
      )}
      style={{ height: '100vh' }}
    >
      {children}
    </motion.div>
  );
}
