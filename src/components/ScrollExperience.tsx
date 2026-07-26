"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useProgress } from "@react-three/drei";
import { Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Scene, { ScrollState } from "./Scene";
import NavigationBar from "./ui/NavigationBar";
import HeroSection from "./sections/HeroSection";
import AnalyticsSection from "./sections/AnalyticsSection";
import AISection from "./sections/AISection";
import BISection from "./sections/BISection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import CTASection from "./sections/CTASection";

gsap.registerPlugin(ScrollTrigger);

const SECTION_COUNT = 7;

const AMBIENT = [0.12, 0.18, 0.15, 0.12, 0.18, 0.15, 0.10];
const LIGHT1_COLORS = [0xffffff, 0x00f3ff, 0x00ff88, 0x00f3ff, 0xffffff, 0x00f3ff, 0xffffff];
const LIGHT2_COLORS = [0x00f3ff, 0x00ff88, 0x00f3ff, 0x00ff88, 0x00f3ff, 0x00ff88, 0x00f3ff];
const FOG_NEAR = [5, 4, 4.5, 4, 5, 4.5, 6];
const FOG_FAR = [16, 13, 14, 13, 16, 14, 18];

export default function ScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollState = useRef<ScrollState>({ progress: 0, section: 0, sectionProgress: 0 });
  const ambientRef = useRef(AMBIENT[0]);
  const lightColor1Ref = useRef(LIGHT1_COLORS[0]);
  const lightColor2Ref = useRef(LIGHT2_COLORS[0]);
  const fogRef = useRef({ near: FOG_NEAR[0], far: FOG_FAR[0] });
  const [activeSection, setActiveSection] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  useGSAP(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const sections = scrollContainer.querySelectorAll("[data-section]");

    sections.forEach((section, i) => {
      if (i >= SECTION_COUNT - 1) return;

      ScrollTrigger.create({
        trigger: section,
        scroller: scrollContainer,
        start: "bottom center",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          const nextIdx = i + 1;
          const p = self.progress;

          ambientRef.current = AMBIENT[i] + (AMBIENT[nextIdx] - AMBIENT[i]) * p;
          lightColor1Ref.current = LIGHT1_COLORS[i] + (LIGHT1_COLORS[nextIdx] - LIGHT1_COLORS[i]) * p;
          lightColor2Ref.current = LIGHT2_COLORS[i] + (LIGHT2_COLORS[nextIdx] - LIGHT2_COLORS[i]) * p;
          fogRef.current.near = FOG_NEAR[i] + (FOG_NEAR[nextIdx] - FOG_NEAR[i]) * p;
          fogRef.current.far = FOG_FAR[i] + (FOG_FAR[nextIdx] - FOG_FAR[i]) * p;
        },
      });
    });

    ScrollTrigger.refresh();
  }, { scope: containerRef, dependencies: [] });

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const update = () => {
      const scrollTop = el.scrollTop;
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;

      const progress = scrollTop / maxScroll;
      scrollState.current.progress = progress;

      const sections = el.querySelectorAll<HTMLElement>("[data-section]");
      const viewCenter = scrollTop + el.clientHeight / 2;

      let closestIdx = 0;
      let minDist = Infinity;
      sections.forEach((section, i) => {
        const sectionCenter = section.offsetTop + section.offsetHeight / 2;
        const dist = Math.abs(viewCenter - sectionCenter);
        if (dist < minDist) {
          minDist = dist;
          closestIdx = i;
        }
      });

      scrollState.current.section = closestIdx;
      setActiveSection(closestIdx);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, []);

  return (
    <div ref={containerRef} className="h-screen overflow-hidden bg-[#0b0f19]">
      {!loaded && (
        <div className="fixed inset-0 z-[60] bg-[#0b0f19] flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-2 border-[#00f3ff]/30 border-t-[#00f3ff] rounded-full animate-spin mb-4" />
          <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Loading</span>
        </div>
      )}

      {/* Full-viewport 3D background */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 2.5, 5.0], fov: 38, near: 0.1, far: 50 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          style={{ width: "100%", height: "100%" }}
        >
          <color attach="background" args={["#0b0f19"]} />
          <CameraSetup />
          <Suspense fallback={null}>
            <Scene
              scrollRef={scrollState}
              ambientRef={ambientRef}
              lightColor1Ref={lightColor1Ref}
              lightColor2Ref={lightColor2Ref}
              fogRef={fogRef}
            />
          </Suspense>
          <ModelLoader onComplete={handleLoaded} />
        </Canvas>
      </div>

      {/* Navigation — fixed outside scroll container */}
      <NavigationBar activeSection={activeSection} scrollContainerRef={scrollContainerRef} />

      {/* Content: scrolls over the 3D scene */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 h-screen overflow-y-auto bg-[#0b0f19]/60 backdrop-blur-sm pt-14 lg:pt-16"
      >
        <div data-section><HeroSection /></div>
        <div data-section><AnalyticsSection /></div>
        <div data-section><AISection /></div>
        <div data-section><BISection /></div>
        <div data-section><ExperienceSection /></div>
        <div data-section><ProjectsSection /></div>
        <div data-section><CTASection /></div>
      </div>
    </div>
  );
}

function CameraSetup() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 0.8, 0);
    camera.updateProjectionMatrix();
  }, [camera]);
  return null;
}

function ModelLoader({ onComplete }: { onComplete: () => void }) {
  const { progress } = useProgress();
  const called = useRef(false);

  useFrame(() => {
    if (progress >= 100 && !called.current) {
      called.current = true;
      onComplete();
    }
  });

  return null;
}
