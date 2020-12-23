import React from 'react';

export const useWindowSizeDivided = (widthDivider: number, heightDivider: number): number[] => {
    const [size, setSize] = React.useState([
        Math.round((window.innerWidth - 0.12 * window.innerWidth) / widthDivider),
        Math.round((window.innerHeight - 0.32 * window.innerHeight) / heightDivider),
    ]);
    React.useLayoutEffect(() => {
        function updateSize() {
            setSize([
                Math.round((window.innerWidth - 0.12 * window.innerWidth) / widthDivider),
                Math.round((window.innerHeight - 0.32 * window.innerHeight) / heightDivider),
            ]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};

export const useWindowSize = (): number[] => {
    const [size, setSize] = React.useState([window.innerWidth, window.innerHeight]);
    React.useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};
