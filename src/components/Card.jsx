import React, { useRef } from 'react';

const Card = ({children,smallPadding, ...props }) => {
    const cardRef = useRef(null);

    //for border hover animation
    const handleMouseMove = (ref) => (e) => {
        // get the card
        const card = ref.current;
        if (!card) return;

        // get the mouse position relative to the card
        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        // calculate the angle from the center of the card to the mouse
        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);

        // adjust the angle so that it's between 0 and 360
        angle = (angle + 360) % 360;

        // set the angle as a CSS variable
        card.style.setProperty("--start", angle + 60);
    };



    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove(cardRef)}
            {...props}
            className={`card card-border rounded-xl text-card-txt z-10 flex flex-col group ${
                smallPadding ? "p-5" : "p-10"
            }`}
        >
            {children}
        </div>
    );
};

export default Card;