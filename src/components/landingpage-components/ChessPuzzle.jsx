import React from 'react'
import Card from "../Card.jsx";

const ChessPuzzle = () => {
    return (
        <div className="flex items-start justify-center pt-5">
            <Card className="w-full max-w-sm mx-auto">
                <iframe
                    src="https://lichess.org/training/frame?theme=brown&bg=dark"
                    style={{
                        width: "200px",
                        aspectRatio: "10/12",
                    }}
                    allowTransparency={true}

                />
            </Card>
        </div>
    )
}
export default ChessPuzzle
