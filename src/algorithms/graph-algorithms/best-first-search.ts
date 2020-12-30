import { GraphState } from '../../store/graph/state';
import { GraphAlgOutput } from '../../utils/types/graph-types/graph-results-types';
import { computeDistance, fromIndexToPair } from '../../utils/graph-utils-functions';
import { GraphNode, Graph, ParentVectorType, Edges } from './graph';

export const bestFirstSearch = (
    startNode: GraphNode,
    destinationNode: GraphNode,
    graphState: GraphState,
): GraphAlgOutput => {
    startNode = { ...startNode, weight: 0 };
    destinationNode = { ...destinationNode, weight: 1 };
    const graph: Graph = {
        numberOfNodes: graphState.numberOfNodes,
        nodes: graphState.nodes,
        edges: graphState.edges,
    };
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
        queue.sort((node1: GraphNode, node2: GraphNode) => {
            const p1 = fromIndexToPair(parseInt(node1.id, 10), graphState.width);
            const p2 = fromIndexToPair(parseInt(node2.id, 10), graphState.width);
            const dest = fromIndexToPair(parseInt(destinationNode.id, 10), graphState.width);

            return computeDistance(p1, dest) - computeDistance(p2, dest);
        });
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
    if (visitedInOrder[visitedInOrder.length - 1].id === destinationNode.id) {
        visitedInOrder.pop();
    }

    return {
        visitedNodes: visitedInOrder,
        parentVector: parent,
    };
};
