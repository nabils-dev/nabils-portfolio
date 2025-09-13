import React from 'react'
import Hero from "../components/landingpage-components/Hero.jsx";
import About from "../components/landingpage-components/About.jsx";
import TechStack from "../components/landingpage-components/TechStack.jsx";
import ChessPuzzle from "../components/landingpage-components/ChessPuzzle.jsx";

const LandingPage = () => {
    return (
        <section className="w-screen h-full flex flex-col">
            <Hero/>

            <div className="flex items-start justify-center">
                <TechStack/>
                <div className="w-[1000px] border border-green-500">
                    <About/>
                </div>

                <div className="flex flex-col items-center justify-center">
                    <ChessPuzzle/>

                </div>

            </div>

        </section>
    )
}
export default LandingPage
