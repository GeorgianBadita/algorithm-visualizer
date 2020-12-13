import { AppState } from './app/state';
import { GraphState } from './graph/state';
import { SortingState } from './sorting/state';

export interface AlgorithmVisualizerState {
    graph: GraphState;
    sorting: SortingState;
    app: AppState;
}
