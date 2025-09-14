'use client';
import React from 'react';
import Card from "../Card.jsx";
import TechStackBallScene from "./techstack-components/TechStackBallScene.jsx";

const TechStack = ({ onBallClick }) => {
    return (
        <div className="flex flex-col items-stretch border border-red-500 w-full h-full p-5">
            <Card className="h-full flex flex-col" disableMouseMove>

                <h className="text-center text-2xl"><u><b>TechStack</b></u></h>

                <div className="flex-grow w-full">
                    <TechStackBallScene onBallClick={onBallClick} />
                </div>
                <b className="text-highlight text-center w-full flex-none">Pick a Ball!</b>

            </Card>
        </div>
    );
};

export default TechStack;
