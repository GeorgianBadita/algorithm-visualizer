import { AlgorithmType } from '../../App';
import { AppActionTypes, CHANGE_ALGORITHM, CHANGE_RUNNING_STATE } from './types';

export const changeAlgorithm = (alg: AlgorithmType): AppActionTypes => ({
    type: CHANGE_ALGORITHM,
    algorithm: alg,
});

export const changeRunningState = (state: boolean): AppActionTypes => ({
    type: CHANGE_RUNNING_STATE,
    state: state,
});
