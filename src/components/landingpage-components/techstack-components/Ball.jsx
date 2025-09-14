'use client';
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import logo from "/pingpong/crossp.jpg";

export default function Ball({ position = [0, 0, 0], onClick, rotation = [0, 0, 0] }) {
    const map = useTexture(logo);
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            // bob only if hovered
            meshRef.current.position.y = hovered
                ? position[1] + Math.sin(clock.getElapsedTime() * 3) * 0.1
                : position[1];
            // scale slightly when hovered
            const scaleValue = hovered ? 1.1 : 1;
            meshRef.current.scale.set(scaleValue, scaleValue, scaleValue);
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={rotation}   // apply rotation
            castShadow
            receiveShadow
            onClick={(e) => {
                e.stopPropagation();
                onClick && onClick();
            }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <sphereGeometry args={[0.3, 64, 64]} />
            <meshStandardMaterial map={map} />
        </mesh>
    );
}
