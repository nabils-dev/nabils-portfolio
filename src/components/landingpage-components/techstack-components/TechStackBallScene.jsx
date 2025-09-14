'use client';
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import Ball from "./Ball";

const TechStackBallScene = ({ onBallClick }) => {
    const [hovered, setHovered] = useState(false);

    const positions = [];
    const rotations = [];
    const cols = 3;
    const rows = 3;
    const spacing = 1.5;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const x = (col - 1) * spacing;
            const y = (1 - row) * spacing;
            positions.push([x, y, 0]);


            if (row === 2) rotations.push([-Math.PI / 8, 0, 0]);
            else rotations.push([0, 0, 0]);
        }
    }

    return (
        <div
            className={`w-full h-full flex items-center justify-center`}
            style={{ cursor: hovered ? "pointer" : "default" }}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
        >
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} className="w-full h-full">
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
                {positions.map((pos, i) => (
                    <Ball key={i} position={pos} rotation={rotations[i]} onClick={onBallClick} />
                ))}
            </Canvas>
        </div>
    );
};

export default TechStackBallScene;
