import wall from '../../../assets/images/wall.png';
import weight from '../../../assets/images/weight.png';
import simple from '../../../assets/images/simple.png';
import { RESTORE_NODE_BUTTON, WALL_NODE_BUTTON, WEIGHTED_NODE_BUTTON } from './node-type-button-type';
import {
    A_STAR,
    BEST_FIRST_SEARCH,
    BREADTH_FIRST_SEARCH,
    DIJKSTRA_ALGORITHM,
    GraphAlgoirhtmsType,
} from './graph-algorithm-types';
import { AlgDropdownOption } from '../app-types/algorithm-classes-types';

export const addNodesDropdownOptions = [
    {
        key: 'Add wall nodes',
        text: 'Add wall nodes',
        value: WALL_NODE_BUTTON,
        image: { avatar: true, src: wall },
    },
    {
        key: 'Add weighted nodes',
        text: 'Add weighted nodes',
        value: WEIGHTED_NODE_BUTTON,
        image: { avatar: true, src: weight },
    },
    {
        key: 'Restore nodes',
        text: 'Restore nodes',
        value: RESTORE_NODE_BUTTON,
        image: { avatar: true, src: simple },
    },
];

export const graphAlgDropdownOptions: AlgDropdownOption[] = [
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
