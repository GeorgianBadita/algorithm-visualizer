import { GraphAlgOutput } from '../../utils/types/graph-algorithms/algorithm-results-types';
import { GraphNode, Graph, ParentVectorType } from './graph';

export const bfs = (startNode: GraphNode, destinationNode: GraphNode, graph: Graph): GraphAlgOutput => {
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
            if (!exists) {
                queue.push({ ...elem });
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
