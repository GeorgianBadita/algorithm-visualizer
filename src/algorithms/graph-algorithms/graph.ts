import { MyDictionary } from '../../utils/dictionary';

export type GraphNode = {
  id: string;
  weight?: number;
};

export type Graph = {
  numberOfNodes: number;
  nodes: [GraphNode];
  edges: MyDictionary<[GraphNode]>;
};
