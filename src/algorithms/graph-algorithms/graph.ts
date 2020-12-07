import { MyDictionary } from '../../utils/dictionary';

export type GraphNode = {
    id: string;
    weight?: number;
};

export type SimpleEdge = {
    from: GraphNode;
    to: GraphNode;
};

export type WeightedEdge = {
    from: GraphNode;
    to: GraphNode;
    weight: number;
};

export type Edges = MyDictionary<GraphNode[]>;

export type Graph = {
    numberOfNodes: number;
    nodes: GraphNode[];
    edges: Edges;
};

export type ParentVectorType = MyDictionary<GraphNode>;
