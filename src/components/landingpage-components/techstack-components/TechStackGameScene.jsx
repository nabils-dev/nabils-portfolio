'use client';
import React from "react";
import { Canvas } from "@react-three/fiber";

const TechStackGameScene = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">

            <div className="w-[100vw] h-[100vh] opacity-20 bg-red-500 rounded-2xl shadow-lg overflow-hidden">
                <Canvas className="w-full h-full">

                </Canvas>
            </div>
        </div>
    );
};

export default TechStackGameScene;
