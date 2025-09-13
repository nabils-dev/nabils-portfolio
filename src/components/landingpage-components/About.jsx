import React from 'react'
import Card from "../Card.jsx";

const About = () => {
    return (
        <div className="flex items-start justify-center ml-0 p-5">
            <Card>
                <ul className="list-disc text-2xl space-y-10">
                    <li>
                        <b className="text-highlight">Full-stack software engineer</b> who brings ideas to life through clean, re-usable and maintainable code.
                    </li>
                    <li>
                        Currently finishing my bachelor in business informatics at <b className="text-highlight">FH Dortmund</b> with a strong focus on cutting-edge technologies.
                    </li>
                    <li>
                        <b className="text-highlight">Passionate</b> about exploring new opportunities to collaborate and develop innovative solutions.
                    </li>
                </ul>
            </Card>
        </div>
    )
}
export default About
