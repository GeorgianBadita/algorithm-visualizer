import { Graph } from '../../../../algorithms/graph-algorithms/graph';

const emptyGraph: Graph = {
    numberOfNodes: 0,
    nodes: [],
    edges: {},
};

test('check defined empty graph has empty properties', () => {
    expect(emptyGraph.nodes).toStrictEqual([]);
    expect(emptyGraph.edges).toStrictEqual({});
    expect(emptyGraph.numberOfNodes).toBe(0);
});
