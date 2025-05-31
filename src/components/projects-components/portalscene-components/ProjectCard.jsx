import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";
import * as THREE from 'three';

const ProjectCard = ({
                         title,
                         description,
                         link,
                         linkColor,
                         position,
                         rotation,
                         titleSize,
                         descriptionSize,
                         cardHeight,
                         titleHeight,
                         descriptionHeight,
                         backgroundColor,
                         border = false,
                         borderColor = "#000000",
                         titleClickable = true,
                     }) => {
    const titleRef = useRef();              // Ref to measure title dimensions
    const rocketRef = useRef();             // Ref for rocket icon
    const [titleWidth, setTitleWidth] = useState(0);            // Cached title width
    const [titleHeightActual, setTitleHeightActual] = useState(0);  // Cached title height
    const [titleYPos, setTitleYPos] = useState(0);              // Cached Y position
    const [rocketButtonHovered, setRocketButtonHovered] = useState(false);  // Hover state for button

    // Ensure cursor resets on component unmount
    useEffect(() => {
        document.body.style.cursor = "default";
        return () => {
            document.body.style.cursor = "default";
        };
    }, []);

    // Dynamically calculate and cache bounding box for title text
    useFrame(() => {
        if (titleRef.current) {
            if (!titleRef.current.geometry.boundingBox) {
                titleRef.current.geometry.computeBoundingBox();
            }
            const bbox = titleRef.current.geometry.boundingBox;
            const width = bbox.max.x - bbox.min.x;
            const height = bbox.max.y - bbox.min.y;

            if (width !== titleWidth) setTitleWidth(width);
            if (height !== titleHeightActual) setTitleHeightActual(height);

            const currentTitleY = titleRef.current.position.y;
            if (currentTitleY !== titleYPos) setTitleYPos(currentTitleY);
        }
    });

    // Handle link click on title or rocket button
    const handleLinkClick = (e, clickedElement = 'unknown') => {
        e.stopPropagation();
        if (link) {
            console.log(`Clicked on ${clickedElement}: Opening link ${link}`);
            window.open(link, "_blank");
        } else {
            console.log(`Clicked on ${clickedElement}, but no link was provided.`);
        }
    };

    // Cursor interactions
    const handlePointerOver = (e) => {
        e.stopPropagation();
        document.body.style.cursor = "pointer";
    };

    const handlePointerOut = (e) => {
        e.stopPropagation();
        document.body.style.cursor = "default";
    };

    // Dimensions and offsets
    const borderThickness = 0.02;
    const borderZOffset = 0.05;

    const underlineHeight = 0.01;
    const underlinePadding = 0.005;
    const underlineZ = 0.061;

    const rocketButtonWidth = 0.15;
    const rocketButtonHeight = 0.15;
    const rocketButtonRadius = 0.07;
    const rocketButtonDepth = 0.05;
    const rocketButtonZ = 0.061;

    const rocketButtonXOffset = titleWidth / 2 + titleSize * 1;
    const rocketButtonYOffset = cardHeight / 2 - titleHeight - 0.1;

    const buttonColorDefault = "#008000";
    const buttonColorHover = "#8899bb";

    return (
        <group position={position} rotation={rotation}>
            {/* Optional border box */}
            {border && (
                <RoundedBox
                    args={[2 + borderThickness * 2, cardHeight + borderThickness * 2, 0.1 + borderThickness * 2]}
                    radius={0.15}
                    smoothness={4}
                    position={[0, 0, -borderZOffset]}
                >
                    <meshBasicMaterial color={borderColor} side={THREE.BackSide} />
                </RoundedBox>
            )}

            {/* Main card */}
            <RoundedBox
                args={[2, cardHeight, 0.1]}
                radius={0.1}
                smoothness={4}
                position={[0, 0, 0]}
            >
                <meshStandardMaterial color={backgroundColor} />

                {/* Title text */}
                <Text
                    ref={titleRef}
                    fontSize={titleSize}
                    position={[0, cardHeight / 2 - titleHeight, 0.06]}
                    anchorX="center"
                    anchorY="top"
                    {...(titleClickable && {
                        onClick: (e) => handleLinkClick(e, 'Title Text'),
                        onPointerOver: handlePointerOver,
                        onPointerOut: handlePointerOut,
                    })}
                >
                    {title}
                </Text>

                {/* Underline under the title */}
                {titleWidth > 0 && titleHeightActual > 0 && (
                    <RoundedBox
                        args={[titleWidth * 0.9, underlineHeight, 0.01]}
                        radius={0.005}
                        smoothness={1}
                        position={[
                            0,
                            titleYPos - titleHeightActual - underlinePadding,
                            underlineZ
                        ]}
                    >
                        <meshBasicMaterial color={"white"} />
                    </RoundedBox>
                )}

                {/* Rocket button next to the title */}
                {titleWidth > 0 && (
                    <group
                        position={[
                            rocketButtonXOffset,
                            rocketButtonYOffset,
                            rocketButtonZ
                        ]}
                        onClick={(e) => handleLinkClick(e, 'Rocket Button')}
                        onPointerOver={(e) => {
                            e.stopPropagation();
                            setRocketButtonHovered(true);
                            handlePointerOver(e);
                        }}
                        onPointerOut={(e) => {
                            e.stopPropagation();
                            setRocketButtonHovered(false);
                            handlePointerOut(e);
                        }}
                    >
                        <RoundedBox
                            args={[rocketButtonWidth, rocketButtonHeight, rocketButtonDepth]}
                            radius={rocketButtonRadius}
                            smoothness={4}
                        >
                            <meshStandardMaterial color={rocketButtonHovered ? buttonColorHover : buttonColorDefault} />
                        </RoundedBox>
                        <Text
                            ref={rocketRef}
                            fontSize={titleSize * 0.7}
                            position={[0, 0, rocketButtonDepth / 2 + 0.01]}
                            anchorX="center"
                            anchorY="middle"
                            color={linkColor}
                            fontWeight="bold"
                        >
                            🚀
                        </Text>
                    </group>
                )}

                {/* Project description text */}
                <Text
                    fontSize={descriptionSize}
                    position={[0, cardHeight / 2 - titleHeight - descriptionHeight, 0.06]}
                    anchorX="center"
                    anchorY="top"
                    maxWidth={1.8}
                >
                    {description}
                </Text>
            </RoundedBox>
        </group>
    );
};

export default ProjectCard;
