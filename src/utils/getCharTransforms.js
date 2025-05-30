export function getCharTransforms(
    text,
    { maxMargin = 20, maxRotation = 10 } = {}
) {
    const rand = (max) => Math.floor(Math.random() * max);
    let up = true;

    return [...text].map((char) => {
        // Only treat A–Z/a–z as letters
        const isLetter = /[A-Za-z]/.test(char);
        const isSpace  = char === " ";

        if (!isLetter) {
            // No transform for non-letters
            return { char, isSpace, style: {} };
        }

        // Decide direction and flip for the next letter
        const dir = up ? -1 : 1;
        up = !up;

        return {
            char,
            isSpace: false,
            style: {
                "--mt": `${dir * rand(maxMargin)}px`,
                "--rot": `${dir * rand(maxRotation)}deg`,
            },
        };
    });
}