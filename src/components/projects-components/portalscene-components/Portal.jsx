import {
    MeshPortalMaterial,
    RoundedBox,
    Text,
    Environment,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { easing } from "maath";

const Portal = ({
                    children,
                    texture,
                    name,
                    color,
                    active,
                    setActive,
                    setHovered,
                    border = false,
                    borderColor = "white",
                    borderThickness = 0.05,
                    scaleActive = 1,
                    scaleInactive = 1,
                    textSize = 0.3,
                    ...props
                }) => {
    // References for animation control
    const portalMaterial = useRef();
    const groupRef = useRef();

    // Optional texture for the portal background
    const map = texture || null;

    // Dimensions for the portal card
    const cardWidth = 2;
    const cardHeight = 3;
    const cardDepth = 0.1;

    // Update animation frame-by-frame
    useFrame((_state, delta) => {
        const isActive = active === name;

        // Smoothly animate the portal blend based on active state
        easing.damp(portalMaterial.current, "blend", isActive ? 1 : 0, 0.2, delta);

        // Smoothly scale the portal in/out based on active state
        easing.damp3(
            groupRef.current.scale,
            isActive
                ? [scaleActive, scaleActive, scaleActive]
                : [scaleInactive, scaleInactive, scaleInactive],
            0.2,
            delta
        );
    });

    return (
        <group ref={groupRef} {...props}>
            {/* Portal label */}
            <Text
                font="fonts/Caprasimo-Regular.ttf"
                fontSize={textSize}
                position={[0, -1.3, cardDepth / 2 + 0.001]}
                anchorY="bottom"
            >
                {name}
                <meshBasicMaterial color={color} toneMapped={false} />
            </Text>

            <group>
                {/* Optional border around the portal */}
                {border && (
                    <RoundedBox
                        args={[
                            cardWidth + borderThickness * 2,
                            cardHeight + borderThickness * 1.5,
                            cardDepth + borderThickness / 2,
                        ]}
                        radius={0.3}
                        smoothness={4}
                        position={[0, 0, -0.2]}
                    >
                        <meshBasicMaterial color={borderColor} side={THREE.DoubleSide} />
                    </RoundedBox>
                )}

                {/* Main portal surface */}
                <RoundedBox
                    name={name}
                    args={[cardWidth, cardHeight, cardDepth]}
                    radius={0.3}
                    smoothness={20}
                    onDoubleClick={() => setActive?.(active === name ? null : name)}
                    onPointerEnter={() => setHovered?.(name)}
                    onPointerLeave={() => setHovered?.(null)}
                >
                    {/* MeshPortalMaterial allows rendering content inside a 3D surface */}
                    <MeshPortalMaterial ref={portalMaterial} side={THREE.DoubleSide}>
                        {/* Lighting and environment for the portal content */}
                        <ambientLight intensity={1} />
                        <Environment preset="sunset" />

                        {/* Custom content rendered inside the portal */}
                        {children}

                        {/* Optional background sphere if texture is provided */}
                        {map && (
                            <mesh>
                                <sphereGeometry args={[5, 64, 64]} />
                                <meshStandardMaterial map={map} side={THREE.BackSide} />
                            </mesh>
                        )}
                    </MeshPortalMaterial>
                </RoundedBox>
            </group>
        </group>
    );
};

export default Portal;
