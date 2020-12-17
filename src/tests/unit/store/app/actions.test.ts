import { changeAlgorithm, changeRunningState } from '../../../../store/app/actions';
import { AppActionTypes, CHANGE_ALGORITHM, CHANGE_RUNNING_STATE } from '../../../../store/app/types';
import { NO_ALGORITHM } from '../../../../utils/types/graph-types/graph-algorithm-types';

describe('app actions', () => {
    it('should create an action to change the running state', () => {
        const newRunningState = false;
        const changeRunningStateAction: AppActionTypes = {
            type: CHANGE_RUNNING_STATE,
            state: newRunningState,
        };
        expect(changeRunningState(newRunningState)).toEqual(changeRunningStateAction);
    });

    it('should create an action to change the selected algorithm', () => {
        const newAlgorithm = NO_ALGORITHM;
        const changeAlgorithmAction: AppActionTypes = {
            type: CHANGE_ALGORITHM,
            algorithm: newAlgorithm,
        };

        expect(changeAlgorithm(newAlgorithm)).toEqual(changeAlgorithmAction);
    });
});
