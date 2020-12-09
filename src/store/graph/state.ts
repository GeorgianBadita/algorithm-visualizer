import { Edges, GraphNode } from '../../algorithms/graph-algorithms/graph';
import { TableNodeType } from '../../containers/GraphContainerAlgorithms';

export interface GraphState {
    numberOfNodes: number;
    nodes: GraphNode[];
    edges: Edges;
    source: GraphNode | null;
    destination: GraphNode | null;
    height: number;
    width: number;
    table: TableNodeType[][];
    initializedtable: boolean;
}
