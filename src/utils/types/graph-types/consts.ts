import start from '../../../assets/images/start.png';
import destination from '../../../assets/images/destination.png';
import wall from '../../../assets/images/wall.png';
import weight from '../../../assets/images/weight.png';
import simple from '../../../assets/images/simple.png';
import {
    DESTINATION_NODE_BUTTON,
    RESTORE_NODE_BUTTON,
    SOURCE_NODE_BUTTON,
    WALL_NODE_BUTTON,
    WEIGHTED_NODE_BUTTON,
} from './node-type-button-type';
import {
    A_STAR,
    BEST_FIRST_SEARCH,
    BREADTH_FIRST_SEARCH,
    DIJKSTRA_ALGORITHM,
    GraphAlgoirhtmsType,
} from './graph-algorithm-types';

export const nodeButtons = [
    {
        text: 'Add wall nodes',
        image: wall,
        active: false,
        type: WALL_NODE_BUTTON,
    },
    {
        text: 'Add weighted nodes',
        image: weight,
        active: false,
        type: WEIGHTED_NODE_BUTTON,
    },
    {
        text: 'Restore nodes',
        image: simple,
        active: false,
        type: RESTORE_NODE_BUTTON,
    },
    {
        text: 'Move source node',
        image: start,
        active: false,
        type: SOURCE_NODE_BUTTON,
    },
    {
        text: 'Move destination node',
        image: destination,
        active: false,
        type: DESTINATION_NODE_BUTTON,
    },
];

export const graphAlgDropdownOptions = [
    {
        key: 'Breadth First Search',
        value: 'Breadth First Search',
        text: 'Breadth First Search',
    },
    {
        key: "Dijkstra's Algorithm",
        value: "Dijkstra's Algorithm",
        text: "Dijkstra's Algorithm",
    },

    {
        key: 'A* Alrogithm',
        value: 'A* Algorithm',
        text: 'A* Algorithm',
    },
    {
        key: 'Best First Search',
        value: 'Best First Search',
        text: 'Best First Search',
    },
];

export const graphAlgorithms: GraphAlgoirhtmsType[] = [
    BREADTH_FIRST_SEARCH,
    DIJKSTRA_ALGORITHM,
    A_STAR,
    BEST_FIRST_SEARCH,
];
