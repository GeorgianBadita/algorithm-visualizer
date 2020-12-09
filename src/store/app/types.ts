import { AlgorithmType } from '../../App';
import { SpeedType } from '../../utils/types/graph-algorithms/alg-speed-type';

export const CHANGE_ALGORITHM = 'CHANGE_ALGORITHM';
export const CHANGE_RUNNING_STATE = 'CHANGE_RUNNINT_STATE';
export const CLEAR_APP = 'CLEAR_APP';
export const CHANGE_SPEED = 'CHANGE_SPEED';

interface ChangeAlgorithmAction {
    type: typeof CHANGE_ALGORITHM;
    algorithm: AlgorithmType;
}

interface ChangeRunningStateAction {
    type: typeof CHANGE_RUNNING_STATE;
    state: boolean;
}

interface ClearAppAction {
    type: typeof CLEAR_APP;
}

interface ChangeSpeedAction {
    type: typeof CHANGE_SPEED;
    speed: SpeedType;
}

export type AppActionTypes = ChangeAlgorithmAction | ChangeRunningStateAction | ClearAppAction | ChangeSpeedAction;
