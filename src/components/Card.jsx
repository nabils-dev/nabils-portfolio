import React, { useRef } from 'react';

const Card = ({ children, smallPadding, disableMouseMove = false, className = "", ...props }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (ref) => (e) => {
        const card = ref.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
        angle = (angle + 360) % 360;

        card.style.setProperty("--start", angle + 60);
    };

    return (
        <div
            ref={cardRef}
            {...props}

            {...(!disableMouseMove ? { onMouseMove: handleMouseMove(cardRef) } : {})}
            className={`card card-border rounded-xl text-card-txt z-10 flex flex-col group ${
                smallPadding ? "p-5" : "p-10"
            } ${disableMouseMove ? "disable-hover" : ""} ${className}`}
        >
            {children}
        </div>
    );
};

export default Card;
