import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export function Earth({ scale = 1, ...props }) {
    // Ref to the group that wraps the Earth model
    const group = useRef();

    // Load the GLTF scene containing the Earth model
    const { scene } = useGLTF("/planet/scene.gltf");

    // Ref to track elapsed time for animation
    const time = useRef(0);

    // Animate rotation on every frame
    useFrame((_state, delta) => {
        if (!group.current) return;

        // Accumulate time
        time.current += delta;

        // Apply a smooth oscillating rotation on the Y axis
        group.current.rotation.y = 0.2 * Math.sin(time.current * 0.5);
    });

    return (
        <group ref={group} {...props} scale={scale} dispose={null}>
            {/* Add a directional light for better shading */}
            <directionalLight intensity={1} position={[2, 2, 2]} />

            {/* Render the loaded GLTF scene as a primitive */}
            <primitive object={scene} />
        </group>
    );
}

// Preload the GLTF file to improve performance
useGLTF.preload("/planet/scene.gltf");
