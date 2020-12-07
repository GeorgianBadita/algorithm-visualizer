import { GraphAlgOutput, Pair } from '../../utils/types/graph-algorithms/algorithm-results-types';
import { Edges, Graph, GraphNode, ParentVectorType } from './graph';
import { Heap } from 'ts-heap';
import { MyDictionary } from '../../utils/dictionary';
import { GraphState } from '../../store/graph/state';
import { computeDistance, fromIndexToPair } from '../../utils/utilsFunctions';

export const aStar = (source: GraphNode, destination: GraphNode, graphState: GraphState): GraphAlgOutput => {
    const heapComparator = (node1: GraphNode, node2: GraphNode): number => {
        if (node1.weight && node2.weight) {
            const p1: Pair = fromIndexToPair(parseInt(node1.id, 10), graphState.width);
            const p2: Pair = fromIndexToPair(parseInt(node2.id, 10), graphState.width);
            const dest: Pair = fromIndexToPair(parseInt(destination.id, 10), graphState.width);

            return node1.weight + computeDistance(p1, dest) - node2.weight - computeDistance(p2, dest);
        }
        return 0;
    };

    const pq: Heap<GraphNode> = new Heap(heapComparator);
    const graph: Graph = {
        numberOfNodes: graphState.numberOfNodes,
        nodes: graphState.nodes,
        edges: graphState.edges,
    };
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
