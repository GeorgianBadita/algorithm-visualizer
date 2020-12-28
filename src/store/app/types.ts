import { SpeedType } from '../../utils/types/app-types/alg-speed-type';
import { AlgorithmType } from '../../utils/types/app-types/algorithm-classes-types';

export const CHANGE_ALGORITHM = 'CHANGE_ALGORITHM';
export const CHANGE_RUNNING_STATE = 'CHANGE_RUNNINT_STATE';
export const CLEAR_APP = 'CLEAR_APP';
export const CHANGE_SPEED = 'CHANGE_SPEED';
export const SET_UI_ACTIONS = 'SET_UI_ACTIONS';

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

interface SetUiActionsAction {
    type: typeof SET_UI_ACTIONS;
    newUiActions: ReturnType<typeof setTimeout>[];
}

export type AppActionTypes =
    | ChangeAlgorithmAction
    | ChangeRunningStateAction
    | ClearAppAction
    | ChangeSpeedAction
    | SetUiActionsAction;
