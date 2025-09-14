'use client';
import { useRef } from 'react';
import LandingPage from "./sections/LandingPage.jsx";
import Projects from "./sections/Projects.jsx";

export default function App() {
    const landingRef = useRef(null);
    const projectsRef = useRef(null);

    return (
        <div className="flex flex-col">
            <div ref={landingRef}>
                <LandingPage projectsRef={projectsRef} />
            </div>
            <div ref={projectsRef}>
                <Projects landingRef={landingRef} />
            </div>
        </div>
    );
}
