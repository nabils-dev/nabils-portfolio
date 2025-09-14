'use client';
import React, { useRef, useState, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { RigidBody, BallCollider, CuboidCollider } from "@react-three/rapier";

export default function Ball({
                                 position = [0, 0, 0],
                                 rotation = [0, 0, 0],
                                 texture,
                                 onClick,
                                 gameBall = false,
                                 incrementScore,
                                 resetScore
                             }) {
    const map = useTexture(texture || undefined);
    const meshRef = useRef();
    const api = useRef();
    const { viewport } = useThree();
    const [hovered, setHovered] = useState(false);


    const resetBall = useCallback(() => {
        if (api.current) {
            api.current.setTranslation({ x: 0, y: 5, z: 0 });
            api.current.setLinvel({ x: 0, y: 5, z: 0 });
        }
    }, []);


    const onTopCollision = useCallback(() => {
        incrementScore();
        resetBall();
    }, [incrementScore, resetBall]);


    const onBottomCollision = useCallback(() => {
        resetScore();
        resetBall();
    }, [resetScore, resetBall]);


    useFrame(({ clock }) => {
        if (!gameBall && meshRef.current) {
            meshRef.current.position.y = hovered
                ? position[1] + Math.sin(clock.getElapsedTime() * 3) * 0.1
                : position[1];

            const scaleValue = hovered ? 1.2 : 1.1;
            meshRef.current.scale.set(scaleValue, scaleValue, scaleValue);
        }
    });

    if (gameBall) {
        return (
            <group position={position}>
                <RigidBody
                    ccd
                    ref={api}
                    angularDamping={0.8}
                    restitution={1}
                    canSleep={false}
                    colliders={false}
                    enabledTranslations={[true, true, false]}
                >
                    <BallCollider args={[0.5]} />
                    <mesh castShadow receiveShadow>
                        <sphereGeometry args={[0.5, 64, 64]} />
                        <meshStandardMaterial map={map} />
                    </mesh>
                </RigidBody>


                <RigidBody
                    type="fixed"
                    colliders={false}
                    position={[0, -viewport.height * 2, 0]}
                    restitution={2.1}
                    onCollisionEnter={onBottomCollision}
                >
                    <CuboidCollider args={[1000, 2, 1000]} />
                </RigidBody>


                <RigidBody
                    type="fixed"
                    colliders={false}
                    position={[0, viewport.height * 4, 0]}
                    restitution={2.1}
                    onCollisionEnter={onTopCollision}
                >
                    <CuboidCollider args={[1000, 2, 1000]} />
                </RigidBody>
            </group>
        );
    }


    return (
        <mesh
            ref={meshRef}
            position={position}
            rotation={rotation}
            castShadow
            receiveShadow
            onClick={e => {
                e.stopPropagation();
                console.log("Clicked texture:", texture);
                onClick && onClick();
            }}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <sphereGeometry args={[0.3, 64, 64]} />
            <meshStandardMaterial {...(map ? { map } : {})} />
        </mesh>
    );
}
