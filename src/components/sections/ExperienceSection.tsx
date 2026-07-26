"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, AlertTriangle, CreditCard, TrendingUp, Users, Briefcase, Building2, Headphones, FileCheck, Scale, Globe } from "lucide-react";

const items = [
  { icon: Briefcase, title: "Specialist, L&D & QA", company: "Centauri/OKG", date: "Jul 2026 – Present", color: "#00ff88" },
  { icon: Shield, title: "Associate, QA & AI", company: "Centauri/OKG", date: "Jul 2024 – Jun 2026", color: "#00f3ff" },
  { icon: AlertTriangle, title: "Specialist, P2P Dispute", company: "Centauri/OKG", date: "May 2023 – Jun 2024", color: "#00ff88" },
  { icon: Headphones, title: "Player Support Lead", company: "Beyondsoft", date: "Jun 2022 – Feb 2023", color: "#00f3ff" },
  { icon: FileCheck, title: "Claims Analyst", company: "AIG Shared Services", date: "Jun 2021 – May 2022", color: "#00ff88" },
  { icon: Scale, title: "Claims Analyst", company: "Cigna", date: "Jun 2021 – May 2022", color: "#00f3ff" },
  { icon: Globe, title: "Content Moderator", company: "Concentrix", date: "Oct 2018 – Feb 2020", color: "#00ff88" },
  { icon: Building2, title: "Operations Coordinator", company: "Osama Zaid Azraq Est", date: "Dec 2015 – Mar 2018", color: "#00f3ff" },
  { icon: CreditCard, title: "Admin Executive", company: "Tabung Haji", date: "Aug 2015 – Nov 2015", color: "#00ff88" },
  { icon: TrendingUp, title: "Senior Business Specialist", company: "AIG Shared Services", date: "Aug 2014 – Aug 2015", color: "#00f3ff" },
  { icon: Users, title: "International Sales Exec", company: "Mayflower Acme Tours", date: "Jan 2014 – Aug 2014", color: "#00ff88" },
];

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="min-h-screen flex items-center py-16 lg:py-24">
      <div className="w-full px-6 lg:px-12 xl:px-16">
        <div className="max-w-xl mx-auto lg:max-w-3xl lg:ml-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 mb-3 lg:mb-4"
          >
            <span className="w-8 h-[1px] bg-[#00ff88]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#00ff88]">
              Professional Experience
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 lg:mb-6"
          >
            Experience Built on{" "}
            <span className="text-[#00ff88]">Real Operations</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 mb-8 lg:mb-10 text-sm lg:text-base leading-relaxed"
          >
            11 roles across fintech, insurance, payments, and operations — from fraud investigations to AI-driven QA.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
            {items.map((item, i) => (
              <motion.div
                key={item.title + item.company}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
                className="backdrop-blur-md bg-white/[0.03] border border-white/[0.06] rounded-xl p-3 lg:p-4 hover:border-white/10 transition-all duration-500 group"
              >
                <div className="flex items-start gap-2.5">
                  <item.icon className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" style={{ color: item.color }} />
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-100 leading-tight">{item.title}</h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">{item.company}</p>
                    <p className="text-[9px] sm:text-[10px] text-slate-600 mt-0.5">{item.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
