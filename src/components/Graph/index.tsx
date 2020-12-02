import React from 'react';
import { NodeType } from './Node/index';
import Node from './Node/index';
import classes from './Graph.module.css';

type GraphProps = {
    table: NodeType[][];
};

const Graph = (props: GraphProps): JSX.Element => {
    const getGraphData = () => {
        return props.table.map((row, x) => (
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
