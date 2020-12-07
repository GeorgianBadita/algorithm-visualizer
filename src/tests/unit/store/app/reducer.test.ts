import { appReducer } from '../../../../store/app/reducer';
import { CHANGE_ALGORITHM, CHANGE_RUNNING_STATE } from '../../../../store/app/types';
import { DIJKSTRA_ALGORITHM, NO_ALGORITHM } from '../../../../utils/types/graph-algorithms/algorithm-types';

describe('app reducer', () => {
    it('should should handle CHANGE_RUNNING_STATE', () => {
        expect(
            appReducer(undefined, {
                type: CHANGE_RUNNING_STATE,
                state: true,
            }),
        ).toEqual({
            selectedAlg: NO_ALGORITHM,
            running: true,
        });
    });

    it('should handle CHANGE_ALGORITHM', () => {
        expect(
            appReducer(undefined, {
                type: CHANGE_ALGORITHM,
                algorithm: DIJKSTRA_ALGORITHM,
            }),
        ).toEqual({
            selectedAlg: DIJKSTRA_ALGORITHM,
            running: false,
        });
    });
});
