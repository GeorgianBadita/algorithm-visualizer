import { AlgorithmType } from '../../App';

export const CHANGE_ALGORITHM = 'CHANGE_ALGORITHM';
export const CHANGE_RUNNING_STATE = 'CHANGE_RUNNINT_STATE';

interface ChangeAlgorithmAction {
    type: typeof CHANGE_ALGORITHM;
    algorithm: AlgorithmType;
}

interface ChangeRunningStateAction {
    type: typeof CHANGE_RUNNING_STATE;
    state: boolean;
}

export type AppActionTypes = ChangeAlgorithmAction | ChangeRunningStateAction;
