import React from 'react';

const DEFAULT_SQUARE_SIZE = 30;

export const useWindowSize = (): number[] => {
    const [size, setSize] = React.useState([
        Math.round((window.innerWidth - 0.1 * window.innerWidth) / DEFAULT_SQUARE_SIZE),
        Math.round((window.innerHeight - 0.32 * window.innerHeight) / DEFAULT_SQUARE_SIZE),
    ]);
    React.useLayoutEffect(() => {
        function updateSize() {
            setSize([
                Math.round((window.innerWidth - 0.1 * window.innerWidth) / DEFAULT_SQUARE_SIZE),
                Math.round((window.innerHeight - 0.32 * window.innerHeight) / DEFAULT_SQUARE_SIZE),
            ]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};
