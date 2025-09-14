'use client';
import React, { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CylinderCollider } from "@react-three/rapier";
import { Text, useGLTF } from "@react-three/drei";
import { easing } from "maath";
import * as THREE from "three";
import { useSnapshot } from "valtio";
import { state } from "./GameState.js";

export default function Paddle({ vec = new THREE.Vector3(), dir = new THREE.Vector3() }) {
    const api = useRef();
    const model = useRef();
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF("/pingpong/paddle/paddle.glb");


    const contactForce = useCallback((payload) => {
        state.api.pong(payload.totalForceMagnitude / 100);
    }, []);

    useFrame(({ pointer, camera }, delta) => {
        vec.set(pointer.x, pointer.y, 0.5).unproject(camera);
        dir.copy(vec).sub(camera.position).normalize();
        vec.add(dir.multiplyScalar(camera.position.length()));

        api.current?.setNextKinematicTranslation({ x: vec.x, y: vec.y, z: 0 });
        api.current?.setNextKinematicRotation({ x: 0, y: 0, z: (pointer.x * Math.PI)/10, w: 1 });


        easing.damp3(model.current.position, [0, 0, 0], 0.2, delta);
        easing.damp3(camera.position, [-pointer.x*4, 2.5 - pointer.y*4, 12], 0.3, delta);
        camera.lookAt(0, 0, 0);
    });

    return (
        <RigidBody
            ccd
            canSleep={false}
            ref={api}
            type="kinematicPosition"
            colliders={false}
            onContactForce={contactForce}
        >
            <CylinderCollider args={[0.15, 1.75]} />
            <group ref={model} position={[0, 2, 0]} scale={0.15}>
                <Text
                    anchorX="center"
                    anchorY="middle"
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 1, 0]}
                    fontSize={10}
                >
                    {snap.count}
                </Text>
                <group rotation={[1.88,-0.35,2.32]} scale={[2.97,2.97,2.97]}>
                    <primitive object={nodes.Bone} />
                    <primitive object={nodes.Bone003} />
                    <primitive object={nodes.Bone006} />
                    <primitive object={nodes.Bone010} />
                    <skinnedMesh
                        castShadow
                        receiveShadow
                        material={materials.glove}
                        material-roughness={1}
                        geometry={nodes.arm.geometry}
                        skeleton={nodes.arm.skeleton}
                    />
                </group>
                <group rotation={[0,-0.04,0]} scale={141.94}>
                    <mesh castShadow receiveShadow material={materials.wood} geometry={nodes.mesh.geometry} />
                    <mesh castShadow receiveShadow material={materials.side} geometry={nodes.mesh_1.geometry} />
                    <mesh castShadow receiveShadow material={materials.foam} geometry={nodes.mesh_2.geometry} />
                    <mesh castShadow receiveShadow material={materials.lower} geometry={nodes.mesh_3.geometry} />
                    <mesh castShadow receiveShadow material={materials.upper} geometry={nodes.mesh_4.geometry} />
                </group>
            </group>
        </RigidBody>
    );
}
