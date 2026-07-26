"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center relative overflow-hidden py-20 lg:py-24"
    >
      <div className="w-full px-6 lg:px-12 xl:px-16">
        <div className="max-w-xl mx-auto lg:max-w-3xl lg:ml-12">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center gap-2 mb-4 lg:mb-6"
          >
            <span className="w-8 h-[1px] bg-[#00f3ff]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#00f3ff] font-medium">
              AI & Data Intelligence
            </span>
          </motion.div>

          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-[1.1] mb-4 lg:mb-6"
          >
            Abdul{" "}
            <span className="text-[#00f3ff]">Karim</span>
          </motion.h1>

          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-slate-400 text-sm sm:text-base lg:text-lg lg:max-w-md mb-3 lg:mb-4 leading-relaxed"
          >
            Quality Assurance & Risk Operations Specialist with 9+ years of experience
            in fraud investigations, transaction monitoring, and AI-driven productivity.
          </motion.p>

          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-2 lg:gap-3 mb-6 lg:mb-8"
          >
            {["QA & Risk Operations", "AI Automation", "Power BI", "Machine Learning"].map(
              (tag) => (
                <span
                  key={tag}
                  className="text-[9px] sm:text-[11px] uppercase tracking-wider px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-white/10 text-slate-400 backdrop-blur-sm bg-white/[0.03]"
                >
                  {tag}
                </span>
              )
            )}
          </motion.div>

          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-wrap gap-3 lg:gap-4"
          >
            <a
              href="#analytics"
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#00f3ff] text-[#0b0f19] font-semibold text-xs sm:text-sm rounded-lg hover:shadow-[0_0_30px_rgba(0,243,255,0.3)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Explore My Work
            </a>
            <a
              href="https://linkedin.com/in/abdulkarimbinazmi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 sm:px-6 py-2.5 sm:py-3 border border-[#00f3ff]/30 text-[#00f3ff] font-semibold text-xs sm:text-sm rounded-lg hover:bg-[#00f3ff]/10 transition-all duration-300 hover:-translate-y-0.5"
            >
              LinkedIn
            </a>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
