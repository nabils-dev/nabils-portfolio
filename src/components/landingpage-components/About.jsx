import React from 'react'
import Card from "../Card.jsx";

const About = () => {
    return (
        <div className="flex items-start justify-center pt-10 px-4">
            <Card className="w-full max-w-sm mx-auto">
                <ul className="list-disc p-6 space-y-6 text-2xl">
                    <li>
                        <b className="text-highlight">Full-stack software engineer</b> who brings ideas to life through clean, re-usable and maintainable code.
                    </li>
                    <li>
                        Currently finishing my bachelor in business informatics at <b className="text-highlight">FH Dortmund</b> with a strong focus on cutting-edge technologies.
                    </li>
                    <li>
                        Passionate about exploring new opportunities to <b className="text-highlight">collaborate</b> and develop innovative solutions.
                    </li>
                </ul>
            </Card>
        </div>
    )
}
export default About
