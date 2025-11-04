'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { type TabConfig } from '../types';
import { useState, useEffect } from 'react';

type HeroSectionProps = {
  activeTab: TabConfig;
  count: number;
};

const TAB_ORDER = ['tracking', 'applied', 'following'] as const;

export default function HeroSection({ activeTab, count }: HeroSectionProps) {
  const [direction, setDirection] = useState(0);
  const [prevIndex, setPrevIndex] = useState(
    TAB_ORDER.indexOf(activeTab.key as (typeof TAB_ORDER)[number])
  );

  // Determine slide direction based on tab order
  useEffect(() => {
    const currentIndex = TAB_ORDER.indexOf(activeTab.key as (typeof TAB_ORDER)[number]);

    if (currentIndex > prevIndex) {
      setDirection(1); // Moving right
    } else if (currentIndex < prevIndex) {
      setDirection(-1); // Moving left
    }

    setPrevIndex(currentIndex);
  }, [activeTab.key, prevIndex]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Animated Background Gradient */}
      <motion.div
        key={`bg-${activeTab.key}`}
        initial={false}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 0 }}
        className={`absolute inset-0 bg-gradient-to-br ${activeTab.bgGradient}`}
      />

      {/* SVG Pattern Overlay */}
      <div className="absolute inset-0 opacity-20">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content with Horizontal Slide Animation */}
      <div className="relative mx-auto flex min-h-[400px] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center sm:px-10 lg:min-h-[450px] lg:px-40 lg:py-24">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeTab.key}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 350, damping: 35 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
              {activeTab.label}
            </div>

            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              {activeTab.title}
            </h1>

            <p className="mt-6 max-w-3xl mx-auto text-base text-white/90 sm:text-lg">
              {activeTab.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 backdrop-blur-sm">
                <span className="font-semibold text-white">{count}</span>{' '}
                <span className="text-white/80">
                  {activeTab.key === 'tracking'
                    ? 'scholarships tracked'
                    : activeTab.key === 'applied'
                      ? 'applications submitted'
                      : 'providers following'}
                </span>
              </div>
              <div className="rounded-full border border-white/20 bg-white/10 px-6 py-2.5 backdrop-blur-sm">
                <span className="text-white/80">Updated in real-time</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}

