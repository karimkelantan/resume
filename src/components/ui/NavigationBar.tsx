"use client";

import { useState, useEffect, RefObject } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const sections = [
  { label: "Intro", id: "hero" },
  { label: "Analytics", id: "analytics" },
  { label: "AI", id: "ai" },
  { label: "BI", id: "bi" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function NavigationBar({
  activeSection,
  scrollContainerRef,
}: {
  activeSection: number;
  scrollContainerRef: RefObject<HTMLDivElement>;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 50);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollContainerRef]);

  const scrollToSection = (id: string) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const target = el.querySelector(`[data-section] [id="${id}"]`) as HTMLElement;
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-[#0b0f19]/80 border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 lg:h-16">
            <button onClick={() => scrollToSection("hero")} className="text-base lg:text-lg font-bold text-slate-100 tracking-tight">
              Abdul <span className="text-[#00f3ff]">Karim</span>
            </button>

            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {sections.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className={`relative text-[10px] xl:text-xs uppercase tracking-widest transition-colors duration-300 ${
                    activeSection === i ? "text-[#00f3ff]" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {s.label}
                  {activeSection === i && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#00f3ff] shadow-[0_0_6px_rgba(0,243,255,0.6)]" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile floating action button */}
      <button
        className="fixed bottom-6 right-6 z-50 lg:hidden w-11 h-11 rounded-full bg-[#0b0f19]/80 backdrop-blur-md border border-white/10 text-slate-100 flex items-center justify-center shadow-lg shadow-black/30 hover:border-[#00f3ff]/30 transition-all duration-300"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0b0f19]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { scrollToSection(s.id); setMobileOpen(false); }}
                className={`text-2xl font-light tracking-wide transition-colors ${
                  activeSection === i ? "text-[#00f3ff]" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
