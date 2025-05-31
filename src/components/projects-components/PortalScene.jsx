import {
    CameraControls,
    Environment,
    useCursor,
    useTexture,
} from "@react-three/drei";
import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";

import Portal from "./portalscene-components/Portal.jsx";
import StarsBackground from "./portalscene-components/StarsBackground.jsx";
import { Earth } from "./portalscene-components/models/Earth.jsx";
import ProjectCard from "./portalscene-components/ProjectCard.jsx";
import { projects } from "../../constants/constants.js";

/* ─────────── constants ─────────── */
const CAMERA_FAR  = [0, 0, 10];
const CAMERA_NEAR = [0, 0,  5];
const MAX_POLAR   = Math.PI / 1.5;
const MIN_POLAR   = Math.PI / 4;

/* ───────────────── helper: lock / unlock page scroll ─────────────── */
function usePageScrollLock(lock, lockY) {
    useEffect(() => {
        if (!lock) return;

        const savedPos  = { x: 0, y: lockY ?? window.scrollY };
        const keepFixed = () => window.scrollTo(savedPos.x, savedPos.y);
        const stop      = (e) => e.preventDefault();

        const prevRoot = document.documentElement.style.overflow;
        const prevBody = document.body.style.overflow;

        document.documentElement.style.overflow =
            document.body.style.overflow = "hidden";

        window.addEventListener("wheel",      stop, { passive: false, capture: true });
        window.addEventListener("touchmove",  stop, { passive: false, capture: true });
        window.addEventListener("scroll", keepFixed, { passive: false });

        keepFixed(); // freeze immediately

        return () => {
            document.documentElement.style.overflow = prevRoot;
            document.body.style.overflow           = prevBody;
            window.removeEventListener("wheel",     stop, { capture: true });
            window.removeEventListener("touchmove", stop, { capture: true });
            window.removeEventListener("scroll", keepFixed);
        };
    }, [lock, lockY]);
}
/* ─────────────────────────────────────────────────────────── */

export const PortalScene = ({ active, setActive }) => {
    const [hovered, setHovered] = useState(null);
    const [lockY,   setLockY]   = useState(null);

    useCursor(hovered);

    const controlsRef  = useRef(null);
    const { scene }    = useThree();
    const spaceTexture = useTexture("textures/space-dark.png");

    /* stable callback avoids needless re-renders in deep trees */
    const handleSetActive = useCallback(name => setActive(name), [setActive]);

    /* disable dolly/zoom */
    useEffect(() => {
        const cc = controlsRef.current;
        if (!cc) return;
        cc.mouseButtons.wheel = 0;
        cc.touches.two        = 0;
        cc.dollySpeed         = 0;
    }, []);

    /* camera focus */
    useEffect(() => {
        const cc = controlsRef.current;
        if (!cc) return;

        const [cx, cy, cz] = active ? CAMERA_NEAR : CAMERA_FAR;
        const target = new THREE.Vector3();
        if (active) scene.getObjectByName(active)?.getWorldPosition(target);

        cc.setLookAt(cx, cy, cz, target.x, target.y, target.z, true);
    }, [active]);

    /* instant jump & lock coordinate */
    useEffect(() => {
        if (!active) {
            history.replaceState(null, "", window.location.pathname + window.location.search);
            setLockY(null);
            return;
        }

        if (active !== "Projects") return;

        const section = document.getElementById("projects-section");
        if (!section) return;

        const y = section.getBoundingClientRect().top + window.scrollY;
        window.scrollTo(0, y);
        history.replaceState(null, "", "#projects-section");
        setLockY(y);
    }, [active]);

    /* lock / unlock scroll */
    usePageScrollLock(active === "Projects" && lockY !== null, lockY);

    /* ────────────────── 3-D Scene ────────────────── */
    return (
        <>
            <ambientLight intensity={0.5} />
            <Environment preset="sunset" />

            <CameraControls
                ref={controlsRef}
                maxPolarAngle={MAX_POLAR}
                minPolarAngle={MIN_POLAR}
            />

            <Portal
                name="Projects"
                color="#38adcf"
                texture={spaceTexture}
                position-x={0}
                rotation-y={0}
                active={active}
                setActive={handleSetActive}
                hovered={hovered}
                setHovered={setHovered}
                scaleInactive={1}
            >
                <StarsBackground size={4} spread={20} />
                <Earth />

                {projects.map((p, i) => (
                    <ProjectCard
                        key={p.title}
                        title={p.title}
                        description={p.description}
                        link={p.link}
                        linkColor={p.linkColor}
                        hovered={hovered}
                        setHovered={setHovered}
                        position={[-2.5, 1.2 - i * 1.2, -1]}
                        rotation={[0, 0.5, 0]}
                        descriptionHeight={0.4}
                        titleHeight={0.14}
                        linkHeight={0.55}
                        titleSize={0.14}
                        descriptionSize={0.1}
                        linkSize={0.07}
                        cardHeight={1}
                        color="white"
                        backgroundColor="#190333"
                        border
                        titleClickable={false}
                        visible={active === "Projects"}
                    />
                ))}
            </Portal>
        </>
    );
};

export default PortalScene;
