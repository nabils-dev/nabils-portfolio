'use client';
import React from 'react';

const Socials = () => {
    return (
        <div className="inline-flex bg-white/40 p-4 rounded-lg space-x-6 mx-auto mt-5">

            <a href="mailto:nabils.dev@gmail.com" target="_blank" rel="noopener noreferrer">
                <img
                    src="/socials/email.png"
                    alt="Email"
                    className="w-12 h-12 hover:scale-120 transition-transform duration-200"
                />
            </a>

            <a href="https://instagram.com/ehlnabil" target="_blank" rel="noopener noreferrer">
                <img
                    src="/socials/instagram.png"
                    alt="Instagram"
                    className="w-12 h-12 hover:scale-120 transition-transform duration-200"
                />
            </a>

            <a href="https://chess.com/member/lilalpaca" target="_blank" rel="noopener noreferrer">
                <img
                    src="/socials/chess.png"
                    alt="Chess"
                    className="w-12 h-12 hover:scale-120 transition-transform duration-200"
                />
            </a>
        </div>
    );
};

export default Socials;
