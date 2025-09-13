import React from 'react'
import BackgroundCanvas from '../components/landingpage-components/BackgroundCanvas.jsx'
import Hero from "../components/landingpage-components/Hero.jsx";
import About from "../components/landingpage-components/About.jsx";
import TechStack from "../components/landingpage-components/TechStack.jsx";
import ChessPuzzle from "../components/landingpage-components/ChessPuzzle.jsx";

const LandingPage = () => {
    return (
        <section className="w-screen h-screen relative">
            <BackgroundCanvas />
            <div className="relative z-10 flex flex-col">
                <Hero/>

                <div className="flex items-start justify-center">
                    <div className="w-[550px] h-[600px] border border-orange-500">
                        <TechStack/>
                    </div>
                    <div className="w-[700px] border border-green-500">
                        <About/>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <ChessPuzzle/>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default LandingPage
