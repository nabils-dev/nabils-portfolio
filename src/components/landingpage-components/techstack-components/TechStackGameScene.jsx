import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Ball from "./Ball.jsx";
import Paddle from "./Paddle.jsx";
import { state } from "./GameState.js";

export default function TechStackGameScene({ selectedBallTexture }) {
    const [showBall, setShowBall] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBall(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] z-50">
            <Canvas
                shadows
                dpr={[1, 1.5]}
                gl={{ antialias: false }}
                camera={{ position: [0, 5, 12], fov: 45 }}
            >
                <ambientLight intensity={0.5 * Math.PI} />
                <spotLight
                    decay={0}
                    position={[-10, 15, -5]}
                    angle={1}
                    penumbra={1}
                    intensity={2}
                    castShadow
                    shadow-mapSize={1024}
                    shadow-bias={-0.0001}
                />

                <Physics gravity={[0, -40, 0]} timeStep="vary">
                    {showBall && (
                        <Ball
                            gameBall
                            position={[0, 5, 0]}
                            texture={selectedBallTexture || "/pingpong/balls/crossp-nodejs.jpg"}
                            incrementScore={() => state.api.pong(10)}
                            resetScore={() => state.api.reset()}
                        />
                    )}
                    <Paddle />
                </Physics>
            </Canvas>
        </div>
    );
}
