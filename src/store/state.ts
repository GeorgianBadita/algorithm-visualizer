import { AppState } from './app/state';
import { GraphState } from './graph/state';

export interface AlgorithmVisualizerState {
    graph: GraphState;
    app: AppState;
}
