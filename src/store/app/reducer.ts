import { NO_ALGORITHM } from '../../utils/types/graph-algorithms/algorithm-types';
import { AppState } from './state';
import { AppActionTypes, CHANGE_ALGORITHM, CHANGE_RUNNING_STATE, CLEAR_APP } from './types';

export const initialAppState: AppState = {
    selectedAlg: NO_ALGORITHM,
    running: false,
};

export const appReducer = (state = initialAppState, action: AppActionTypes): AppState => {
    switch (action.type) {
        case CHANGE_ALGORITHM:
            return {
                selectedAlg: action.algorithm,
                running: false,
            };
        case CHANGE_RUNNING_STATE:
            return {
                selectedAlg: state.selectedAlg,
                running: action.state,
            };
        case CLEAR_APP:
            return {
                ...initialAppState,
            };
        default:
            return state;
    }
};
