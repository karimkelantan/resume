"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGLTF, Environment, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";

export interface ScrollState {
  progress: number;
  section: number;
  sectionProgress: number;
}

const SMOKE_COLS = 7;
const SMOKE_ROWS = 7;
const SMOKE_TOTAL = 45;

function Model({ scrollRef }: { scrollRef: React.RefObject<ScrollState> }) {
  const { scene } = useGLTF("/models/karimmodel.glb");
  const groupRef = useRef<THREE.Group>(null);
  const currentRot = useRef(0);

  useFrame(() => {
    if (!groupRef.current) return;
    const progress = scrollRef.current?.progress ?? 0;
    const targetRot = progress * Math.PI * 0.25;
    currentRot.current += (targetRot - currentRot.current) * 0.03;
    groupRef.current.rotation.y = currentRot.current;
  });

  return (
    <group ref={groupRef} position={[0, -1.0, 0]} scale={[3.4, 3.4, 3.4]}>
      <primitive object={scene} />
    </group>
  );
}

function SmokeParticles({ scrollRef }: { scrollRef: React.RefObject<ScrollState> }) {
  const smokeTexture = useLoader(THREE.TextureLoader, "/textures/Smoke45Frames.png");
  const count = 18;

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.3) * 5,
      y: (Math.random() - 0.4) * 7 - 1,
      z: (Math.random() - 0.5) * 4 - 1,
      speed: 0.4 + Math.random() * 0.6,
      offset: Math.random() * SMOKE_TOTAL,
      scale: 1.5 + Math.random() * 2.0,
      driftX: (Math.random() - 0.5) * 0.3,
      opacity: 0.12 + Math.random() * 0.13,
    }));
  }, []);

  const sprites = useRef<THREE.Sprite[]>([]);
  const materials = useRef<THREE.SpriteMaterial[]>([]);

  useEffect(() => {
    materials.current = particles.map(() => {
      const tex = smokeTexture.clone();
      tex.flipY = false;
      tex.offset.set(0, (SMOKE_ROWS - 1) / SMOKE_ROWS);
      tex.repeat.set(1 / SMOKE_COLS, 1 / SMOKE_ROWS);
      return new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: 0.15,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      });
    });
  }, [smokeTexture, particles]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    particles.forEach((p, i) => {
      const sprite = sprites.current[i];
      const mat = materials.current[i];
      if (!sprite || !mat || !mat.map) return;

      const frame = Math.floor((t * p.speed + p.offset) % SMOKE_TOTAL);
      const col = frame % SMOKE_COLS;
      const row = Math.floor(frame / SMOKE_COLS);

      mat.map.offset.set(col / SMOKE_COLS, 1 - (row + 1) / SMOKE_ROWS);
      mat.map.needsUpdate = true;

      sprite.position.x = p.x + Math.sin(t * 0.2 + p.offset) * p.driftX;
      sprite.position.y = p.y + ((t * 0.15 * p.speed) % 7) - 3;
      sprite.position.z = p.z;

      const progress = scrollRef.current?.progress ?? 0;
      mat.opacity = p.opacity + Math.sin(progress * Math.PI) * 0.04;
    });
  });

  return (
    <>
      {particles.map((p, i) => (
        <sprite
          key={i}
          ref={(el) => { if (el) sprites.current[i] = el; }}
          position={[p.x, p.y, p.z]}
          scale={[p.scale, p.scale, 1]}
          material={materials.current[i]}
        />
      ))}
    </>
  );
}

function FlareEffects({ scrollRef }: { scrollRef: React.RefObject<ScrollState> }) {
  const flareTexture = useLoader(THREE.TextureLoader, "/textures/flare_0.png");

  const flares = useMemo(() => [
    { x: 0.5, y: 1.5, z: 0.5, scale: 2.5, baseOpacity: 0.08, speed: 0.8 },
    { x: -0.8, y: 2.0, z: 0.3, scale: 1.8, baseOpacity: 0.06, speed: 1.2 },
  ], []);

  const sprites = useRef<THREE.Sprite[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const progress = scrollRef.current?.progress ?? 0;

    flares.forEach((f, i) => {
      const sprite = sprites.current[i];
      if (!sprite) return;

      const mat = sprite.material as THREE.SpriteMaterial;
      const pulse = Math.sin(t * f.speed + i) * 0.02;
      const sectionPulse = Math.sin(progress * Math.PI * 2) * 0.02;
      mat.opacity = f.baseOpacity + pulse + sectionPulse;

      sprite.position.x = f.x + Math.sin(t * 0.15 + i) * 0.2;
      sprite.position.y = f.y + Math.cos(t * 0.1 + i) * 0.15;
    });
  });

  return (
    <>
      {flares.map((f, i) => (
        <sprite
          key={i}
          ref={(el) => { if (el) sprites.current[i] = el; }}
          position={[f.x, f.y, f.z]}
          scale={[f.scale, f.scale, 1]}
        >
          <spriteMaterial
            map={flareTexture}
            transparent
            opacity={f.baseOpacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </sprite>
      ))}
    </>
  );
}

function AmbientDust({ scrollRef }: { scrollRef: React.RefObject<ScrollState> }) {
  const count = 100;
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.3) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 1;
    }
    return pos;
  }, []);

  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.1,
      transparent: true,
      opacity: 0.05,
      color: new THREE.Color(0x00f3ff),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      toneMapped: false,
    });
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const section = scrollRef.current?.section ?? 0;

    const posAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(t * 0.15 + i * 0.06) * 0.0006;
      arr[i * 3] += Math.cos(t * 0.12 + i * 0.1) * 0.0003;
    }
    posAttr.needsUpdate = true;

    if (section === 2) {
      material.color.setHex(0x00ff88);
    } else if (section === 4) {
      material.color.setHex(0xffffff);
    } else {
      material.color.setHex(0x00f3ff);
    }
    material.opacity = 0.04 + Math.sin(t * 0.3) * 0.015;
  });

  return (
    <points ref={pointsRef} material={material}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
    </points>
  );
}

export interface SceneProps {
  scrollRef: React.RefObject<ScrollState>;
  ambientRef: React.RefObject<number>;
  lightColor1Ref: React.RefObject<number>;
  lightColor2Ref: React.RefObject<number>;
  fogRef: React.RefObject<{ near: number; far: number }>;
}

export default function Scene({
  scrollRef,
  ambientRef,
  lightColor1Ref,
  lightColor2Ref,
  fogRef,
}: SceneProps) {
  const keyLightRef = useRef<THREE.SpotLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);
  const ambientRefLocal = useRef<THREE.AmbientLight>(null);
  const fogMeshRef = useRef<THREE.Fog>(null);

  useFrame(() => {
    if (ambientRefLocal.current) {
      ambientRefLocal.current.intensity = ambientRef.current ?? 0.12;
    }
    if (keyLightRef.current) {
      keyLightRef.current.color.setHex(lightColor1Ref.current ?? 0xffffff);
    }
    if (rimLightRef.current) {
      rimLightRef.current.color.setHex(lightColor2Ref.current ?? 0x00f3ff);
    }
    if (fogMeshRef.current && fogRef.current) {
      fogMeshRef.current.near = fogRef.current.near;
      fogMeshRef.current.far = fogRef.current.far;
    }
  });

  return (
    <>
      <PerformanceMonitor>
        <ambientLight ref={ambientRefLocal} intensity={0.12} color="#f5f0e0" />

        <spotLight
          ref={keyLightRef}
          position={[2, 4, 3]}
          angle={0.5}
          penumbra={0.8}
          intensity={2.0}
          color="#ffffff"
          distance={18}
        />

        <pointLight
          ref={rimLightRef}
          position={[-3, 2, -1]}
          intensity={1.2}
          color="#00f3ff"
          distance={14}
        />

        <pointLight
          ref={fillLightRef}
          position={[0, -3, 2]}
          intensity={0.4}
          color="#00ff88"
          distance={12}
        />

        <Model scrollRef={scrollRef} />
        <SmokeParticles scrollRef={scrollRef} />
        <FlareEffects scrollRef={scrollRef} />

        <AmbientDust scrollRef={scrollRef} />

        <fog ref={fogMeshRef} attach="fog" args={["#0b0f19", 5, 16]} />

        <Environment preset="night" />
      </PerformanceMonitor>
    </>
  );
}

useGLTF.preload("/models/karimmodel.glb");
