export const NO_ALGORITHM = 'Choose an Algorithm';
export const DIJKSTRA_ALGORITHM = "Dijkstra's Algorithm";
export const BREADTH_FIRST_SEARCH = 'Breadth First Search';
export const A_STAR = 'A* Algorithm';
export const BEST_FIRST_SEARCH = 'Best First Search';

export type GraphAlgoirhtmsType =
    | typeof DIJKSTRA_ALGORITHM
    | typeof BREADTH_FIRST_SEARCH
    | typeof NO_ALGORITHM
    | typeof A_STAR
    | typeof BEST_FIRST_SEARCH;
