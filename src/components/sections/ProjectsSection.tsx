"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BarChart3, LayoutDashboard, Users, Car, Zap } from "lucide-react";

const projects = [
  { icon: BarChart3, title: "AI & Data Analytics", desc: "Automated analytics pipelines and ML-driven insights", color: "#00f3ff" },
  { icon: LayoutDashboard, title: "Business Intelligence Dashboards", desc: "Real-time KPI monitoring across departments", color: "#00ff88" },
  { icon: Users, title: "CRM Systems", desc: "Customer relationship management automation", color: "#00f3ff" },
  { icon: Car, title: "Car Rental Management System", desc: "Full-stack fleet management platform", color: "#00ff88" },
  { icon: Zap, title: "Business Automation", desc: "End-to-end process automation solutions", color: "#00f3ff" },
];

export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="min-h-screen flex items-center py-16 lg:py-24">
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
              Selected Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6"
          >
            Turning Ideas Into{" "}
            <span className="text-[#00f3ff]">Real Systems</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 mb-8 lg:mb-10 text-sm lg:text-base leading-relaxed"
          >
            Projects that deliver measurable impact across analytics, intelligence, and automation.
          </motion.p>

          <div className="space-y-3 lg:space-y-4">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                className="flex items-start gap-3 lg:gap-4 backdrop-blur-md bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 lg:p-4 hover:border-[#00f3ff]/20 transition-all duration-500 group cursor-pointer"
              >
                <p.icon className="w-4 h-4 lg:w-5 lg:h-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ color: p.color }} />
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-100">{p.title}</h3>
                  <p className="text-[10px] sm:text-xs text-slate-500 mt-0.5">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
