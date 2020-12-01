import React from 'react';
import { SIMPLE_NODE } from './Node/index';
import Node from './Node/index';
import classes from './Graph.module.css';

type GraphProps = {
    height: number;
    width: number;
};

const initData = (height: number, width: number): typeof SIMPLE_NODE[][] => {
    return Array(height)
        .fill(null)
        .map(() => Array(width).fill(SIMPLE_NODE));
};

const Graph = (props: GraphProps): JSX.Element => {
    const [table, setTable] = React.useState(initData(props.height, props.width));

    const getGraphData = () => {
        return table.map((row, x) => (
            <tr key={x}>
                {row.map((type, y) => (
                    <td key={`${x} ${y}`}>
                        <Node nodeType={type} row={x} col={y}></Node>
                    </td>
                ))}
            </tr>
        ));
    };

    return (
        <table className={classes.graph} cellSpacing={0}>
            <tbody>{getGraphData()}</tbody>
        </table>
    );
};

export default Graph;
