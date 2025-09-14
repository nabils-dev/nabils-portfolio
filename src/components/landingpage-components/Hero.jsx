import React from 'react';
import Card from '../Card.jsx';
import { heroText } from '../../constants/constants.js';
import { getCharTransforms } from '../../utils/getCharTransforms.js';

const Hero = () => {

    const charTransforms = getCharTransforms(heroText.title, {
        maxMargin: 10,
        maxRotation: 10,
    });

    return (
        <div className="flex items-start justify-center pt-10 px-4 border border-red-500">
            <Card smallPadding className="w-full max-w-sm mx-auto">
                <div className="flex space-x-4">
                    <img
                        src="/vite.svg"
                        alt="profile"
                        className="w-24 h-24 rounded-full object-cover shadow-lg"
                    />
                    <div>
                        <h3 className="text-3xl font-bold word flex">
                            {charTransforms.map(({ char, isSpace, style }, i) => (
                                <span
                                    key={i}
                                    className={`char ${isSpace ? 'w-2' : ''}`}
                                    style={style}
                                >
                  {isSpace ? '\u00A0' : char}
                </span>
                            ))}
                        </h3>
                        <p className="text-lg">{heroText.desc}</p>
                        <p className="text-sm text-gray-400">{heroText.location}</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Hero;
