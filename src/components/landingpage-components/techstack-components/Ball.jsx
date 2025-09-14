'use client';
import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

export default function Ball({ position = [0,0,0], rotation=[0,0,0], texture, onClick }) {

    const map = useTexture(texture || undefined);

    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame(({ clock }) => {
        if (meshRef.current) {

            meshRef.current.position.y = hovered
                ? position[1] + Math.sin(clock.getElapsedTime() * 3) * 0.1
                : position[1];


            const scaleValue = hovered ? 1.1 : 1;
            meshRef.current.scale.set(scaleValue, scaleValue, scaleValue);
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={rotation}
            castShadow
            receiveShadow
            onClick={e => {
                e.stopPropagation();
                console.log("Clicked texture:", texture);
                onClick && onClick();
            }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <sphereGeometry args={[0.3, 64, 64]} />
            <meshStandardMaterial {...(map ? { map } : {})} />
        </mesh>
    );
}
