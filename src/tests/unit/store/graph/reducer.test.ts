import { Graph, GraphNode } from '../../../../algorithms/graph-algorithms/graph';
import { TableNodeType } from '../../../../containers/GraphContainerAlgorithms';
import { graphReducer, initialGraphState } from '../../../../store/graph/reducer';
import { GraphState } from '../../../../store/graph/state';
import { ADD_NODE, DELETE_NODE, INIT_GRAPH } from '../../../../store/graph/types';
import { SIMPLE_NODE } from '../../../../utils/types/graph-types/node-type';

const width = 3;
const height = 3;

const graphfor3x3: Graph = {
    numberOfNodes: 9,
    nodes: Array.from({ length: 9 }, (_, i) => i).map((elem) => ({ id: `${elem}` } as GraphNode)),

    edges: {
        '0': [{ id: '1' }, { id: '3' }],
        '1': [{ id: '0' }, { id: '2' }, { id: '4' }],
        '2': [{ id: '1' }, { id: '5' }],
        '3': [{ id: '0' }, { id: '4' }, { id: '6' }],
        '4': [{ id: '1' }, { id: '3' }, { id: '5' }, { id: '7' }],
        '5': [{ id: '2' }, { id: '4' }, { id: '8' }],
        '6': [{ id: '3' }, { id: '7' }],
        '7': [{ id: '4' }, { id: '6' }, { id: '8' }],
        '8': [{ id: '5' }, { id: '7' }],
    },
};

const initData = (height: number, width: number): TableNodeType[][] => {
    return Array(height)
        .fill(null)
        .map(() => Array(width).fill({ nodeType: SIMPLE_NODE }));
};

const table3x3: TableNodeType[][] = initData(height, width);

describe('graph reducer', () => {
    it('should handle INIT_GRAPH', () => {
        const newState: GraphState = graphReducer(undefined, {
            type: INIT_GRAPH,
            width: width,
            height: height,
        });

        expect(newState.numberOfNodes).toEqual(graphfor3x3.numberOfNodes);
        expect(newState.nodes).toEqual(graphfor3x3.nodes);
        expect(newState.edges).toEqual(graphfor3x3.edges);
    });

    it('should handle DELETE_NODE in midele', () => {
        const newState: GraphState = graphReducer(
            {
                ...initialGraphState,
                width: 3,
                height: 3,
                nodes: graphfor3x3.nodes,
                edges: graphfor3x3.edges,
                numberOfNodes: graphfor3x3.numberOfNodes,
            },
            {
                type: DELETE_NODE,
                node: { id: '4' },
            },
        );
        expect(newState.nodes).not.toContainEqual({ id: '4' });
        expect(newState.nodes.length).toEqual(graphfor3x3.nodes.length - 1);
        expect(newState.edges['4']).toBe(undefined);
        graphfor3x3.edges['4'].forEach((elem: GraphNode) => {
            expect(newState.edges[elem.id]).not.toContainEqual({ id: '4' });
        });
    });

    it('should handle DELETE_NODE at side', () => {
        const newState: GraphState = graphReducer(
            {
                ...initialGraphState,
                width: 3,
                height: 3,
                nodes: graphfor3x3.nodes,
                edges: graphfor3x3.edges,
                numberOfNodes: graphfor3x3.numberOfNodes,
            },
            {
                type: DELETE_NODE,
                node: { id: '8' },
            },
        );
        expect(newState.nodes).not.toContainEqual({ id: '8' });
        expect(newState.nodes.length).toEqual(graphfor3x3.nodes.length - 1);
        expect(newState.edges['8']).toBe(undefined);
        graphfor3x3.edges['8'].forEach((elem: GraphNode) => {
            expect(newState.edges[elem.id]).not.toContainEqual({ id: '8' });
        });
    });

    it('should handle DELETE_NODE only once', () => {
        const newState: GraphState = graphReducer(
            {
                ...initialGraphState,
                width: 3,
                height: 3,
                nodes: graphfor3x3.nodes,
                edges: graphfor3x3.edges,
                numberOfNodes: graphfor3x3.numberOfNodes,
            },
            {
                type: DELETE_NODE,
                node: { id: '8' },
            },
        );

        expect(newState.nodes).not.toContainEqual({ id: '8' });
        expect(newState.nodes.length).toEqual(graphfor3x3.nodes.length - 1);
        expect(newState.edges['8']).toBe(undefined);
        graphfor3x3.edges['8'].forEach((elem: GraphNode) => {
            expect(newState.edges[elem.id]).not.toContainEqual({ id: '8' });
        });

        const tryDeleteNodeAgainState = graphReducer(newState, { type: DELETE_NODE, node: { id: '8' } });

        expect(tryDeleteNodeAgainState.nodes).not.toContainEqual({ id: '8' });
        expect(tryDeleteNodeAgainState.nodes.length).toEqual(graphfor3x3.nodes.length - 1);
        expect(tryDeleteNodeAgainState.edges['8']).toBe(undefined);
        graphfor3x3.edges['8'].forEach((elem: GraphNode) => {
            expect(tryDeleteNodeAgainState.edges[elem.id]).not.toContainEqual({ id: '8' });
        });
        expect(
            Object.keys(tryDeleteNodeAgainState.edges).reduce(
                (sum: number, currElem: string) => sum + tryDeleteNodeAgainState.edges[currElem].length,
                0,
            ),
        ).toEqual(
            Object.keys(graphfor3x3.edges).reduce(
                (sum: number, currElem: string) => sum + graphfor3x3.edges[currElem].length,
                0,
            ) - 4,
        );
    });

    it('should handle ADD_NODE', () => {
        const stateRemoving4 = graphReducer(
            {
                ...initialGraphState,
                width: 3,
                height: 3,
                nodes: graphfor3x3.nodes,
                edges: graphfor3x3.edges,
                numberOfNodes: graphfor3x3.numberOfNodes,
            },
            { type: DELETE_NODE, node: { id: '4' } },
        );
        const adding4AgainState = graphReducer(stateRemoving4, {
            type: ADD_NODE,
            node: { id: '4' },
            table: table3x3,
        });
        expect(adding4AgainState.numberOfNodes).toEqual(graphfor3x3.numberOfNodes);
        expect(
            Object.keys(adding4AgainState.edges).reduce(
                (sum: number, currElem: string) => sum + adding4AgainState.edges[currElem].length,
                0,
            ),
        ).toEqual(
            Object.keys(graphfor3x3.edges).reduce(
                (sum: number, currElem: string) => sum + graphfor3x3.edges[currElem].length,
                0,
            ),
        );
    });
});
