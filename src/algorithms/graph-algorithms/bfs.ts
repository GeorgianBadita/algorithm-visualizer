import { GraphAlgOutput } from '../../utils/types/graph-algorithms/algorithm-results-types';
import { GraphNode, Graph, ParentVectorType, Edges } from './graph';

export const bfs = (startNode: GraphNode, destinationNode: GraphNode, graph: Graph): GraphAlgOutput => {
    startNode = { ...startNode, weight: 0 };
    destinationNode = { ...destinationNode, weight: 1 };
    graph.nodes = graph.nodes.map((elem: GraphNode) => {
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

    const queue: GraphNode[] = [startNode];
    const visitedNodes: GraphNode[] = [startNode];
    const visitedInOrder: GraphNode[] = [];
    const parent: ParentVectorType = {};

    while (queue.length > 0) {
        const currentNode = { ...queue[0] };
        visitedInOrder.push(currentNode);
        queue.shift();
        if (currentNode.id === destinationNode.id) {
            break;
        }

        graph.edges[currentNode.id].forEach((elem: GraphNode) => {
            let exists = false;
            visitedNodes.forEach((visitedNode: GraphNode) => {
                if (visitedNode.id === elem.id) {
                    exists = true;
                }
            });
            if (!exists && currentNode.weight !== undefined) {
                queue.push({ ...elem, weight: 1 + currentNode.weight });
                parent[elem.id] = { ...currentNode };
                visitedNodes.push({ ...elem });
            }
        });
    }
    visitedInOrder.shift();
    visitedInOrder.pop();
    return {
        visitedNodes: visitedInOrder,
        parentVector: parent,
    };
};
