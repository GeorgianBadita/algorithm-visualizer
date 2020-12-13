import { SpeedType } from '../../utils/types/app-types/alg-speed-type';
import { AlgorithmType } from '../../utils/types/app-types/algorithm-classes-types';

export interface AppState {
    selectedAlg: AlgorithmType;
    running: boolean;
    speed: SpeedType;
}
