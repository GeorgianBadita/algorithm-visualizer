import { Edges, GraphNode } from '../../algorithms/graph-algorithms/graph';
import { TableNodeType } from '../../utils/types/graph-types/table-node-type';

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
