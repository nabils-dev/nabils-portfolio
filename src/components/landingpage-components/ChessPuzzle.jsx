import React from 'react'
import Card from "../Card.jsx";

const ChessPuzzle = () => {
    return (
        <div className="flex items-start justify-center pt-10 px-4">
            <Card className="w-full max-w-sm mx-auto">
                <iframe
                    src="https://lichess.org/training/frame?theme=brown&bg=dark"
                    style={{
                        width: "400px",
                        aspectRatio: "10/11",
                    }}
                    allowTransparency={true}
                />
            </Card>
        </div>
    )
}
export default ChessPuzzle
