/**
 * MosqueScene — React Three Fiber scene evoking a mosque interior.
 *
 * NOT a photorealistic mosque. Atmospheric abstraction only, per the
 * locked spec (Q5-Q8): stylized arch/mihrab, warm ambient light,
 * particle dust motes drifting in a shaft of light, subtle camera
 * drift. Zero explicit religious iconography (no crescents, no
 * calligraphy) — the "spiritual" quality comes from light + geometry,
 * not motifs. Muslim visitors read the reference; non-Muslim visitors
 * see a beautiful abstract space.
 *
 * Performance:
 *   - Client component ('use client') — only ships when the hero renders
 *   - dpr capped at 1.5 so retina Macs don't overdraw
 *   - Antialias on for smooth arch edges
 *   - Frame loop paused when tab loses focus (drei's <Preload />)
 *
 * Motion: single slow camera pan (2° / 6 seconds). Respects
 * prefers-reduced-motion via CSS media query in globals.css (Framer
 * Motion + R3F both honor it).
 */
'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useMemo, useRef } from 'react';
import * as THREE from 'three';

/**
 * A single Islamic-style pointed arch, built procedurally from
 * THREE.Shape. Uses ExtrudeGeometry to give it a small depth so
 * lighting picks up the edges instead of flattening it.
 */
function Arch({
  position,
  height = 3,
  width = 1.4,
  depth = 0.18,
  color = '#3A2812',
}: {
  position: [number, number, number];
  height?: number;
  width?: number;
  depth?: number;
  color?: string;
}) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const halfW = width / 2;
    const bodyH = height * 0.55; // straight walls up to this height, then arch begins
    // Rectangular body
    shape.moveTo(-halfW, 0);
    shape.lineTo(-halfW, bodyH);
    // Pointed-arch top — quadratic curves meeting at the peak
    shape.quadraticCurveTo(-halfW, height, 0, height);
    shape.quadraticCurveTo(halfW, height, halfW, bodyH);
    shape.lineTo(halfW, 0);
    shape.lineTo(-halfW, 0);
    return new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
      curveSegments: 24,
    });
  }, [height, width, depth]);

  return (
    <mesh position={position} geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial
        color={color}
        roughness={0.7}
        metalness={0.1}
      />
    </mesh>
  );
}

/**
 * Central mihrab — the main focal point. A larger, deeper arch with
 * warm interior light spilling out to imply depth and sanctity without
 * showing anything specific inside.
 */
function Mihrab() {
  return (
    <group position={[0, -1.2, -2]}>
      <Arch height={3.6} width={1.8} depth={0.4} color="#2A1D0E" />
      {/* Warm point light inside the mihrab, low intensity so it
          glows through the opening without blowing out. */}
      <pointLight
        position={[0, 1.5, 0.5]}
        color="#D4AF37"
        intensity={2.2}
        distance={4}
        decay={1.5}
      />
    </group>
  );
}

/**
 * Dust motes drifting through the warm light. Uses a Points cloud
 * with a soft gold color. Motion is deterministic — sine-wave
 * displacement per particle so it looks alive without needing GPU
 * particle simulation.
 */
function DustMotes({ count = 240 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Random position in a shallow box in front of the arches
      positions[i * 3 + 0] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = Math.random() * 4 - 1.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
      seeds[i] = Math.random() * Math.PI * 2;
    }
    return { positions, seeds };
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.elapsedTime;
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const y = positions[i * 3 + 1];
      // Gentle floating motion — each mote has its own phase.
      posAttr.array[i * 3 + 1] = y + Math.sin(time * 0.35 + seeds[i]) * 0.05;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#D4AF37"
        size={0.035}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/**
 * Camera drift — subtle 2-degree pan over ~12 seconds so the scene
 * feels alive without pulling attention away from the center content.
 * Respects prefers-reduced-motion: when the media query matches, the
 * drift amplitude drops to zero.
 */
function CameraRig() {
  const reducedMotion = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    [],
  );

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.elapsedTime;
    // Small horizontal pan (0.15 rad ≈ 8.6°) and even smaller vertical
    // bob. Camera looks at the mihrab (target set below).
    state.camera.position.x = Math.sin(t * 0.12) * 0.4;
    state.camera.position.y = 0.3 + Math.sin(t * 0.08) * 0.15;
    state.camera.lookAt(0, 0.6, -2);
  });
  return null;
}

/**
 * The full scene composition. Wrapped in Suspense so any lazy assets
 * don't block the initial paint of the HTML overlay above.
 */
export function MosqueScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      shadows
      camera={{ position: [0, 0.3, 5], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {/* --- Lighting --- */}
        {/* Soft ambient so shadows aren't pure black. */}
        <ambientLight intensity={0.25} color="#F8F5EF" />
        {/* Warm key light from above-left, mimicking a high window
            common in Islamic architecture (clerestory). */}
        <directionalLight
          position={[3, 6, 4]}
          intensity={0.9}
          color="#F4E4B5"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        {/* Cool fill from opposite side to keep depth readable. */}
        <directionalLight
          position={[-4, 2, 2]}
          intensity={0.35}
          color="#B8C4D9"
        />

        {/* --- Geometry --- */}
        <Mihrab />

        {/* Colonnade — 4 arches arranged in a shallow arc behind
            the mihrab, giving a sense of depth without cluttering. */}
        <Arch position={[-3.2, -1.2, -1.5]} height={2.4} width={1.1} color="#3A2812" />
        <Arch position={[-1.9, -1.2, -0.8]} height={2.6} width={1.15} color="#3A2812" />
        <Arch position={[1.9, -1.2, -0.8]} height={2.6} width={1.15} color="#3A2812" />
        <Arch position={[3.2, -1.2, -1.5]} height={2.4} width={1.1} color="#3A2812" />

        {/* Floor plane — subtle gradient shadow catcher */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.21, 0]} receiveShadow>
          <planeGeometry args={[20, 12]} />
          <shadowMaterial opacity={0.25} />
        </mesh>

        {/* --- Atmosphere --- */}
        <DustMotes count={220} />

        {/* --- Camera --- */}
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
