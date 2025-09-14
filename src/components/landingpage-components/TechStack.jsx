'use client';
import React from 'react';
import Card from "../Card.jsx";
import TechStackBallScene from "./techstack-components/TechStackBallScene.jsx";
import TechStackGameScene from "./techstack-components/TechStackGameScene.jsx";

const TechStack = ({ onBallClick, showGameScene }) => {
    return (
        <div className="flex flex-col items-stretch border border-red-500 w-full h-full p-5">
            <Card className="h-full flex flex-col" disableMouseMove>
                <h1 className="text-center text-2xl"><u><b>TechStack</b></u></h1>

                <div className="flex-grow w-full">

                    {!showGameScene && <TechStackBallScene onBallClick={onBallClick} />}


                    {showGameScene && <TechStackGameScene />}
                </div>

                {!showGameScene && (
                    <b className="text-highlight text-center w-full flex-none">Pick a Ball!</b>
                )}
            </Card>
        </div>
    );
};

export default TechStack;
