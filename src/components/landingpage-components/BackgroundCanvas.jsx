import * as THREE from 'three'
import React, { Suspense, useRef, useMemo } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { Water } from 'three-stdlib'

extend({ Water })

function Ocean() {
    const ref = useRef()
    const gl = useThree((state) => state.gl)
    const waterNormals = useLoader(THREE.TextureLoader, '/ocean/waternormals.jpeg')
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
    const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
    const config = useMemo(
        () => ({
            textureWidth: 512,
            textureHeight: 512,
            waterNormals,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x003F91,
            distortionScale: 3.7,
            fog: false,
            format: gl.encoding,
        }),
        [waterNormals]
    )
    useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta*0.25))
    return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}

export default function BackgroundCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
            }}
        >
            <pointLight decay={0} position={[100, 100, 100]} />
            <pointLight decay={0.5} position={[-100, -100, -100]} />
            <Suspense fallback={null}>
                <Ocean />
            </Suspense>
            <Sky scale={1000} sunPosition={[1200, 150, -1000]} turbidity={0.1} />
        </Canvas>
    )
}
