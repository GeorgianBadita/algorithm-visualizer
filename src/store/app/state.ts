import { AlgorithmType } from '../../App';
import { SpeedType } from '../../utils/types/graph-algorithms/alg-speed-type';

export interface AppState {
    selectedAlg: AlgorithmType;
    running: boolean;
    speed: SpeedType;
}
