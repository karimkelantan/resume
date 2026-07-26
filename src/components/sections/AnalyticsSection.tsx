"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BarChart3, PieChart, LineChart, Presentation, Eye, Target } from "lucide-react";

const skills = [
  { icon: BarChart3, title: "Data Analysis", color: "#00f3ff" },
  { icon: PieChart, title: "Power BI", color: "#00ff88" },
  { icon: LineChart, title: "Excel (Advanced)", color: "#00f3ff" },
  { icon: Presentation, title: "Business Intelligence", color: "#00ff88" },
  { icon: Eye, title: "Data Visualization", color: "#00f3ff" },
  { icon: Target, title: "KPI Reporting", color: "#00ff88" },
];

export default function AnalyticsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="analytics" ref={ref} className="min-h-screen flex items-center py-16 lg:py-24">
      <div className="w-full px-6 lg:px-12 xl:px-16">
        <div className="max-w-xl mx-auto lg:max-w-3xl lg:ml-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-3 lg:mb-4"
          >
            <span className="w-8 h-[1px] bg-[#00f3ff]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#00f3ff]">
              Data Analytics
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6"
          >
            Analytics That Drive{" "}
            <span className="text-[#00f3ff]">Decisions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 mb-8 lg:mb-10 text-sm lg:text-base leading-relaxed"
          >
            Transforming raw data into actionable intelligence through automated analytics,
            visualization, and reporting frameworks.
          </motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4">
            {skills.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="backdrop-blur-md bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 lg:p-4 hover:border-[#00f3ff]/20 transition-all duration-500 group"
              >
                <s.icon className="w-4 h-4 lg:w-5 lg:h-5 mb-2 group-hover:scale-110 transition-transform duration-300" style={{ color: s.color }} />
                <h3 className="text-xs sm:text-sm font-semibold text-slate-100">{s.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
