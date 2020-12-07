import { GraphNode } from '../../../../algorithms/graph-algorithms/graph';
import { TableNodeType } from '../../../../containers/GraphContainerAlgorithms';
import {
    addNode,
    deleteNode,
    initGraph,
    changeDestinationNode,
    changeSourceNode,
} from '../../../../store/graph/actions';
import {
    ADD_NODE,
    CHANGE_DESTINATION_NODE,
    CHANGE_SOURCE_NODE,
    DELETE_NODE,
    GraphActionTypes,
    INIT_GRAPH,
} from '../../../../store/graph/types';

describe('graph actions', () => {
    it('should create an action to add a node', () => {
        const node = { id: '0' } as GraphNode;
        const table: TableNodeType[][] = [[]];
        const addNodeAction: GraphActionTypes = {
            type: ADD_NODE,
            node: node,
            table: table,
        };
        expect(addNode(node, table)).toEqual(addNodeAction);
    });

    it('should create an action to delete a node', () => {
        const node = { id: '0' } as GraphNode;
        const deleteNodeAction: GraphActionTypes = {
            type: DELETE_NODE,
            node: node,
        };
        expect(deleteNode(node)).toEqual(deleteNodeAction);
    });

    it('should create an action to initialize the graph', () => {
        const width = 0;
        const height = 0;
        const initGraphAction: GraphActionTypes = {
            type: INIT_GRAPH,
            height: height,
            width: width,
        };
        expect(initGraph(height, width)).toEqual(initGraphAction);
    });

    it('should create an action to change source node', () => {
        const newSource = { id: '0' } as GraphNode;
        const changeSourceAction: GraphActionTypes = {
            type: CHANGE_SOURCE_NODE,
            newSource: newSource,
        };
        expect(changeSourceNode(newSource)).toEqual(changeSourceAction);
    });

    it('should create an action to change destination node', () => {
        const newDest = { id: '0' } as GraphNode;
        const changeDestAction: GraphActionTypes = {
            type: CHANGE_DESTINATION_NODE,
            newDest: newDest,
        };
        expect(changeDestinationNode(newDest)).toEqual(changeDestAction);
    });
});
