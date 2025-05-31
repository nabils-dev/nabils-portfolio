import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const StarsBackground = ({ size = 25, spread = 8, direction = null, speed = 0.01 }) => {

    // Reference to the star field
    const starsRef = useRef();

    // Number of stars
    const count = 10000;

    // Normalize the movement direction vector if provided
    const moveDir = useMemo(() => {
        if (!direction) return null;
        if (Array.isArray(direction)) {
            return new THREE.Vector3(...direction).normalize();
        }
        if (direction.isVector3) {
            return direction.clone().normalize();
        }
        return null;
    }, [direction]);

    // Generate random positions for the stars within the given spread
    const starPositions = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = THREE.MathUtils.randFloatSpread(spread);
            positions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(spread);
            positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(spread);
        }
        return positions;
    }, [count, spread]);

    // Create buffer geometry using the generated positions
    const starGeometry = useMemo(() => {
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
        return geometry;
    }, [starPositions]);

    // Material configuration for stars
    const material = useMemo(() => {
        return new THREE.PointsMaterial({
            color: 0xffffff,
            size,
            sizeAttenuation: false,
            transparent: true,
            depthWrite: false,
            opacity: 0.8,
        });
    }, [size]);

    // Animate stars on each frame
    useFrame(() => {
        if (!starsRef.current) return;

        const positions = starsRef.current.geometry.attributes.position.array;

        // No movement if speed is 0
        if (speed === 0) return;

        // If no direction is provided, rotate the star field
        if (!moveDir) {
            starsRef.current.rotation.y -= 0.0005;
            return;
        }

        // Move each star in the direction vector
        for (let i = 0; i < count; i++) {
            let x = positions[i * 3];
            let y = positions[i * 3 + 1];
            let z = positions[i * 3 + 2];

            x += moveDir.x * speed;
            y += moveDir.y * speed;
            z += moveDir.z * speed;

            // Wrap around if the star moves beyond the defined spread
            if (Math.abs(x) > spread / 2) {
                x = -Math.sign(x) * spread / 2;
                y = THREE.MathUtils.randFloatSpread(spread);
                z = THREE.MathUtils.randFloatSpread(spread);
            }
            if (Math.abs(y) > spread / 2) {
                y = -Math.sign(y) * spread / 2;
                x = THREE.MathUtils.randFloatSpread(spread);
                z = THREE.MathUtils.randFloatSpread(spread);
            }
            if (Math.abs(z) > spread / 2) {
                z = -Math.sign(z) * spread / 2;
                x = THREE.MathUtils.randFloatSpread(spread);
                y = THREE.MathUtils.randFloatSpread(spread);
            }

            // Update position in the buffer
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
        }

        // Mark the position attribute for update
        starsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points
            ref={starsRef}
            geometry={starGeometry}
            material={material}
            frustumCulled={false} // Prevent stars from being clipped when outside the view frustum
        />
    );
};

export default StarsBackground;
