import { MEDIUM_SPEED } from '../../utils/types/app-types/alg-speed-type';
import { BREADTH_FIRST_SEARCH } from '../../utils/types/graph-algorithms/graph-algorithm-types';
import { AppState } from './state';
import { AppActionTypes, CHANGE_ALGORITHM, CHANGE_RUNNING_STATE, CHANGE_SPEED, CLEAR_APP } from './types';

export const initialAppState: AppState = {
    selectedAlg: BREADTH_FIRST_SEARCH,
    running: false,
    speed: MEDIUM_SPEED,
};

export const appReducer = (state = initialAppState, action: AppActionTypes): AppState => {
    switch (action.type) {
        case CHANGE_ALGORITHM:
            return {
                selectedAlg: action.algorithm,
                running: false,
                speed: state.speed,
            };
        case CHANGE_RUNNING_STATE:
            return {
                selectedAlg: state.selectedAlg,
                running: action.state,
                speed: state.speed,
            };
        case CLEAR_APP:
            return {
                ...initialAppState,
            };
        case CHANGE_SPEED:
            return {
                ...state,
                speed: action.speed,
            };
        default:
            return state;
    }
};
