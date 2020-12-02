import { Edges, GraphNode } from '../../algorithms/graph-algorithms/graph';

export interface GraphState {
    numberOfNodes: number;
    nodes: GraphNode[];
    edges: Edges;
    source: GraphNode | null;
    destination: GraphNode | null;
}
