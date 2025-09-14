'use client';
import { useState } from 'react';
import BackgroundCanvas from '../components/landingpage-components/BackgroundCanvas.jsx';
import Hero from "../components/landingpage-components/Hero.jsx";
import About from "../components/landingpage-components/About.jsx";
import TechStack from "../components/landingpage-components/TechStack.jsx";
import ChessPuzzle from "../components/landingpage-components/ChessPuzzle.jsx";
import TechStackGameScene from "../components/landingpage-components/techstack-components/TechStackGameScene.jsx";
import {state} from "../components/landingpage-components/techstack-components/GameState.js";

const LandingPage = ({ projectsRef }) => {
    const [ballClicked, setBallClicked] = useState(false);
    const [showContent, setShowContent] = useState(true);
    const [fadeIn, setFadeIn] = useState(true);
    const [selectedBallTexture, setSelectedBallTexture] = useState(null);

    const handleBallClick = (texture) => {
        setSelectedBallTexture(texture);
        setFadeIn(false);
        setTimeout(() => {
            setShowContent(false);
            setBallClicked(true);
        }, 500);
    };

    const handleArrowClick = () => {
        if (ballClicked) {
            // Reset the score when leaving the game scene
            state.api.reset();

            setShowContent(true);
            setBallClicked(false);
            setFadeIn(false);
            setTimeout(() => setFadeIn(true), 50);
        } else {
            projectsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <section className="w-screen h-screen relative">
            <BackgroundCanvas />

            {showContent && (
                <div
                    className={`relative z-10 flex flex-col h-full transition-opacity duration-500 ${
                        fadeIn ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Hero />
                    <div className="flex items-start justify-center h-full">
                        <div className="flex flex-col items-center justify-center">
                            <ChessPuzzle />
                        </div>

                        <div className="w-[700px] border border-green-500">
                            <About />
                        </div>

                        <div className="w-[550px] h-[700px] border border-orange-500 flex">
                            <TechStack onBallClick={handleBallClick} />
                        </div>
                    </div>
                </div>
            )}

            {ballClicked && <TechStackGameScene selectedBallTexture={selectedBallTexture} />}

            <div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 cursor-pointer z-50 animate-bounce"
                onClick={handleArrowClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </section>
    );
};

export default LandingPage;
