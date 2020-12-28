import { MEDIUM_SPEED } from '../../utils/types/app-types/alg-speed-type';
import { NO_ALGORITHM } from '../../utils/types/graph-types/graph-algorithm-types';
import { AppState } from './state';
import {
    AppActionTypes,
    CHANGE_ALGORITHM,
    CHANGE_RUNNING_STATE,
    CHANGE_SPEED,
    CLEAR_APP,
    SET_UI_ACTIONS,
} from './types';

export const initialAppState: AppState = {
    selectedAlg: NO_ALGORITHM,
    running: false,
    speed: MEDIUM_SPEED,
    uiActions: [],
};

export const appReducer = (state = initialAppState, action: AppActionTypes): AppState => {
    switch (action.type) {
        case CHANGE_ALGORITHM:
            return {
                selectedAlg: action.algorithm,
                running: false,
                speed: state.speed,
                uiActions: state.uiActions,
            };
        case CHANGE_RUNNING_STATE:
            return {
                selectedAlg: state.selectedAlg,
                running: action.state,
                speed: state.speed,
                uiActions: state.uiActions,
            };
        case CLEAR_APP:
            return {
                ...state,
                running: false,
            };
        case CHANGE_SPEED:
            return {
                ...state,
                speed: action.speed,
            };
        case SET_UI_ACTIONS:
            return {
                ...state,
                uiActions: action.newUiActions,
            };
        default:
            return state;
    }
};
