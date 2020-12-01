export const validCoords = (x: number, y: number, height: number, width: number) => {
    return x >= 0 && y >= 0 && x < height && y < width;
};
