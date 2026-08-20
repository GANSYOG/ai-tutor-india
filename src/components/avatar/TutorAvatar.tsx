"use client";

import React, { useRef, useEffect } from "react";
import { useFrame, useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import { useAudioVisemeSync } from "@/hooks/useAudioVisemeSync";

export function TutorAvatar({
    modelUrl,
    speaking = false,
    visemeValue = 0
}: {
    modelUrl: string;
    speaking?: boolean;
    visemeValue?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const { scene, materials, animations } = useGLTF(modelUrl);
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    // Attempt to find idle and speaking animations if they exist in the GLB
    const idleActionName = names.find((name) => name.toLowerCase().includes("idle"));
    const speakActionName = names.find((name) => name.toLowerCase().includes("talk") || name.toLowerCase().includes("speak"));

    let currentAction = null;

    if (speaking && speakActionName && actions[speakActionName]) {
      currentAction = actions[speakActionName];
    } else if (!speaking && idleActionName && actions[idleActionName]) {
      currentAction = actions[idleActionName];
    }

    if (currentAction) {
      currentAction.reset().fadeIn(0.5).play();
    }

    return () => {
      if (currentAction) {
        currentAction.fadeOut(0.5);
      }
    };
  }, [speaking, actions, names]);

  useFrame((state, delta) => {
    // Implement idle head/eye movement
    if (!speaking && group.current) {
        // Very subtle breathing/idle movement
        group.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.01;
    }

    // Apply viseme morph targets if they exist on the mesh (e.g. ReadyPlayerMe standard visemes)
    if (scene) {
        scene.traverse((node: any) => {
            if (node.isMesh && node.morphTargetDictionary && node.morphTargetInfluences) {
                // Example: 'mouthOpen' or 'viseme_O'
                const mouthOpenIndex = node.morphTargetDictionary['mouthOpen'] ?? node.morphTargetDictionary['viseme_O'];
                if (mouthOpenIndex !== undefined) {
                    // Smooth transition
                    node.morphTargetInfluences[mouthOpenIndex] = THREE.MathUtils.lerp(
                        node.morphTargetInfluences[mouthOpenIndex],
                        speaking ? visemeValue : 0,
                        0.5
                    );
                }
            }
        });
    }
  });

  return (
    <group ref={group} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}
