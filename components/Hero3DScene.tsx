"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import type { Group } from "three";
import type { MutableRefObject } from "react";

function GlassForms({ pointer }: { pointer: MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.elapsedTime;
    group.current.rotation.y += (pointer.current.x * 0.16 + Math.sin(t * 0.22) * 0.08 - group.current.rotation.y) * 0.018;
    group.current.rotation.x += (-pointer.current.y * 0.12 + Math.cos(t * 0.18) * 0.04 - group.current.rotation.x) * 0.018;
  });

  return (
    <group ref={group}>
      <Float speed={0.7} rotationIntensity={0.12} floatIntensity={0.18}>
        <mesh position={[0.15, 0.05, 0]}>
          <icosahedronGeometry args={[1.35, 2]} />
          <MeshTransmissionMaterial
            transmission={1}
            thickness={0.9}
            roughness={0.08}
            ior={1.32}
            chromaticAberration={0.025}
            samples={4}
            resolution={256}
            anisotropicBlur={0.08}
          />
        </mesh>
      </Float>
      <Float speed={0.45} rotationIntensity={0.18} floatIntensity={0.12}>
        <mesh rotation={[0.9, 0.3, 0.4]} position={[-1.55, -0.75, -0.8]}>
          <torusGeometry args={[0.64, 0.055, 16, 96]} />
          <meshStandardMaterial color="#f26363" metalness={0.82} roughness={0.2} />
        </mesh>
      </Float>
      <Float speed={0.55} rotationIntensity={0.14} floatIntensity={0.1}>
        <mesh rotation={[0.35, 0.8, 0.15]} position={[1.55, 0.95, -1.15]}>
          <torusGeometry args={[0.42, 0.035, 12, 72]} />
          <meshStandardMaterial color="#f4d6d6" metalness={0.9} roughness={0.16} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3DScene() {
  const pointer = useRef({ x: 0, y: 0 });
  const [motionAllowed, setMotionAllowed] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setMotionAllowed(!media.matches);

    const onPreferenceChange = (event: MediaQueryListEvent) => setMotionAllowed(!event.matches);
    const onPointerMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    media.addEventListener("change", onPreferenceChange);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      media.removeEventListener("change", onPreferenceChange);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  if (!motionAllowed) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5.4], fov: 42 }}
      dpr={[1, 1.25]}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      frameloop="always"
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 5]} intensity={2.2} />
        <pointLight position={[-3, -2, 2]} intensity={2.4} color="#f26363" />
        <GlassForms pointer={pointer} />
      </Suspense>
    </Canvas>
  );
}
