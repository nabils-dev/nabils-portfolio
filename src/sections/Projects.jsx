import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PortalScene } from "../components/projects-components/PortalScene.jsx";
import StarsBackground from "../components/projects-components/portalscene-components/StarsBackground.jsx";
import { Preload } from "@react-three/drei";

const Projects = () => {
    const [active, setActive] = useState(null);

    return (
        <section className="w-screen h-screen border border-red-500" id="projects-section">
            <Canvas
                className="cursor-pointer"
                camera={{ position: [0, 0, 10], fov: 50 }}
            >
                <StarsBackground size={3} spread={500} speed={0.005} direction={[-1, 0, 0]} />

                <PortalScene active={active} setActive={setActive} />

                <Preload all />
            </Canvas>
        </section>
    );
};

export default Projects;
