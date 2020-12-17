import { MyDictionary } from '../../utils/types/app-types/dictionary';

export type GraphNode = {
    id: string;
    weight?: number;
};

export type Edges = MyDictionary<GraphNode[]>;

export type Graph = {
    numberOfNodes: number;
    nodes: GraphNode[];
    edges: Edges;
};

export type ParentVectorType = MyDictionary<GraphNode>;
