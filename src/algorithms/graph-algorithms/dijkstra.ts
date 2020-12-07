import { GraphAlgOutput } from '../../utils/types/graph-algorithms/algorithm-results-types';
import { Edges, Graph, GraphNode, ParentVectorType } from './graph';
import { Heap } from 'ts-heap';
import { MyDictionary } from '../../utils/dictionary';

const heapComparator = (node1: GraphNode, node2: GraphNode): number => {
    if (node1.weight && node2.weight) {
        return node1.weight - node2.weight;
    }
    return 0;
};

export const dijkstra = (source: GraphNode, destination: GraphNode, graph: Graph): GraphAlgOutput => {
    const pq: Heap<GraphNode> = new Heap(heapComparator);

    graph.nodes = graph.nodes.map((elem: GraphNode) => {
        if (elem.weight) {
            return elem;
        }
        return { id: elem.id, weight: 1 };
    });
    graph.edges = Object.keys(graph.edges).reduce((oldE: Edges, key: string) => {
        oldE[key] = graph.edges[key].map((elem: GraphNode) => {
            if (elem.weight) {
                return elem;
            }
            return { id: elem.id, weight: 1 };
        });
        return oldE;
    }, {});

    const dist = graph.nodes.reduce((map: MyDictionary<number>, currentNode: GraphNode) => {
        map[currentNode.id] = Infinity;
        return map;
    }, {});

    dist[source.id] = 0;
    pq.add({ id: source.id, weight: dist[source.id] });
    const parent: ParentVectorType = {};
    const visitedNodes: GraphNode[] = [];

    while (!pq.isEmpty) {
        const currentBest = pq.pop();

        if (!currentBest) continue;

        if (currentBest?.weight !== dist[currentBest.id]) {
            continue;
        }
        visitedNodes.push({ ...currentBest });

        if (currentBest.id === destination.id) {
            break;
        }

        graph.edges[currentBest.id].forEach((adj: GraphNode) => {
            if (adj.weight && dist[adj.id] > dist[currentBest.id] + adj.weight) {
                dist[adj.id] = dist[currentBest.id] + adj.weight;
                pq.add({ id: adj.id, weight: dist[adj.id] });
                parent[adj.id] = { ...currentBest };
            }
        });
    }
    visitedNodes.pop();
    visitedNodes.shift();

    return {
        visitedNodes: visitedNodes,
        parentVector: parent,
    };
};
