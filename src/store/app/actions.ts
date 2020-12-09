import { AlgorithmType } from '../../App';
import { SpeedType } from '../../utils/types/graph-algorithms/alg-speed-type';
import { AppActionTypes, CHANGE_ALGORITHM, CHANGE_RUNNING_STATE, CHANGE_SPEED, CLEAR_APP } from './types';

export const changeAlgorithm = (alg: AlgorithmType): AppActionTypes => ({
    type: CHANGE_ALGORITHM,
    algorithm: alg,
});

export const changeRunningState = (state: boolean): AppActionTypes => ({
    type: CHANGE_RUNNING_STATE,
    state: state,
});

export const clearApp = (): AppActionTypes => ({
    type: CLEAR_APP,
});

export const changeSpeed = (newSpeed: SpeedType): AppActionTypes => ({
    type: CHANGE_SPEED,
    speed: newSpeed,
});
