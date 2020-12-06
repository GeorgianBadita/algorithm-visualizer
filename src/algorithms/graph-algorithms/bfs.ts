import { GraphNode, Graph } from './graph';

export const bfs = (startNode: GraphNode, destinationNode: GraphNode, graph: Graph): GraphNode[] => {
    const queue: GraphNode[] = [startNode];
    const visitedNodes: GraphNode[] = [];
    while (queue.length > 0) {
        const currentNode = { ...queue[0] };
        visitedNodes.push(currentNode);
        queue.shift();
        if (currentNode === destinationNode) {
            break;
        }
        graph.edges[currentNode.id].forEach((elem: GraphNode) => {
            if (!visitedNodes.includes(elem)) {
                queue.push(elem);
            }
        });
    }
    return visitedNodes;
};
