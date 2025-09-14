import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PortalScene } from "../components/projects-components/PortalScene.jsx";
import StarsBackground from "../components/projects-components/portalscene-components/StarsBackground.jsx";
import { Preload } from "@react-three/drei";

const Projects = ({ landingRef }) => {
    const [active, setActive] = useState(null);

    const handleArrowClick = () => {
        if (active) {
            setActive(null);
        } else {
            landingRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="w-screen h-screen relative flex items-center justify-center">

            <div
                className="absolute top-4 left-1/2 transform -translate-x-1/2 cursor-pointer z-50 animate-bounce"
                onClick={handleArrowClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
            </div>

            {!active && (
                <div
                    className="absolute z-50 text-white text-xl"
                    style={{
                        left: '25%',
                        top: '50%',
                        transform: 'translateY(-50%)'
                    }}
                >
                    <div className="flex flex-col space-y-30 text-xl">
                        <b className="text-highlight">Drag to move</b>
                        <b className="text-highlight">Double-click to enter</b>
                    </div>
                </div>
            )}

            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <StarsBackground size={3} spread={500} speed={0.005} direction={[-1, 0, 0]} />

                <PortalScene active={active} setActive={setActive} />

                <Preload all />
            </Canvas>
        </section>
    );
};

export default Projects;
