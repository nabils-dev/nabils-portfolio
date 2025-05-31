import React from 'react'
import Hero from "../components/landingpage-components/Hero.jsx";
import About from "../components/landingpage-components/About.jsx";
import TechStack from "../components/landingpage-components/TechStack.jsx";
import ChessPuzzle from "../components/landingpage-components/ChessPuzzle.jsx";

const LandingPage = () => {
    return (
        <section className="w-screen h-screen">
            <Hero/>

            <div className="flex flex-col items-center justify-center">
                <About/>
                <div className="flex flex-row items-center justify-center pt-10 px-4">
                    <ChessPuzzle/>
                    <TechStack/>
                </div>

            </div>

        </section>
    )
}
export default LandingPage
