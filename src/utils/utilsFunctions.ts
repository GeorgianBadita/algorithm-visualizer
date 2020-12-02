export type Pair = {
    row: number;
    col: number;
};

export const validCoords = (x: number, y: number, height: number, width: number): boolean => {
    return x >= 0 && y >= 0 && x < height && y < width;
};

export const generateRandomNumber = (start: number, end: number): number => {
    start = Math.ceil(start);
    end = Math.floor(end);

    return Math.floor(Math.random() * (end - start) + start);
};

export const fromIndexToPair = (index: number, width: number): Pair => {
    return {
        row: (index / width) | 0,
        col: index % width,
    };
};
