import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HIGH_SPEED, LOW_SPEED, MEDIUM_SPEED, SpeedType } from './types/app-types/alg-speed-type';

export const generateRandomNumber = (start: number, end: number): number => {
    start = Math.ceil(start);
    end = Math.floor(end);

    return Math.floor(Math.random() * (end - start) + start);
};

export const createErrorToast = (err: string): void => {
    toast.error(err, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

export const speedStrToSpeed = (newSpeed: string): SpeedType => {
    switch (newSpeed) {
        case 'Low Speed':
            return LOW_SPEED;
        case 'Medium Speed':
            return MEDIUM_SPEED;
        case 'High Speed':
            return HIGH_SPEED;
        default:
            return MEDIUM_SPEED;
    }
};
