import { appReducer } from '../../../../store/app/reducer';
import { CHANGE_ALGORITHM, CHANGE_RUNNING_STATE, CHANGE_SPEED } from '../../../../store/app/types';
import { HIGH_SPEED, MEDIUM_SPEED } from '../../../../utils/types/app-types/alg-speed-type';
import { DIJKSTRA_ALGORITHM, NO_ALGORITHM } from '../../../../utils/types/graph-types/graph-algorithm-types';

describe('app reducer', () => {
    it('should handle CHANGE_RUNNING_STATE', () => {
        expect(
            appReducer(undefined, {
                type: CHANGE_RUNNING_STATE,
                state: true,
            }),
        ).toEqual({
            selectedAlg: NO_ALGORITHM,
            speed: MEDIUM_SPEED,
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
            speed: MEDIUM_SPEED,
            running: false,
        });
    });

    it('should handle CHANGE_SPEED', () => {
        expect(
            appReducer(undefined, {
                type: CHANGE_SPEED,
                speed: HIGH_SPEED,
            }),
        ).toEqual({
            selectedAlg: NO_ALGORITHM,
            speed: HIGH_SPEED,
            running: false,
        });
    });
});
