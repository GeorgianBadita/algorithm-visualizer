import React from 'react';
import Layout from './hoc/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlgVisualizerRouting from './containers/AlgVisualizerRouting';
import { Provider } from 'react-redux';

type AppProps = {
    store: any;
};

export const NO_ALGORITHM = 'Choose an Algorithm';
export const DIJKSTRA_ALGORITHM = "Dijkstra's Algorithm";
export const BREADTH_FIRST_SEARCH = 'Breadth First Search';

export type GraphAlgoirhtmsType = typeof DIJKSTRA_ALGORITHM | typeof BREADTH_FIRST_SEARCH | typeof NO_ALGORITHM;
export type AlgorithmType = GraphAlgoirhtmsType;

const App = (props: AppProps): JSX.Element => {
    return (
        <Provider store={props.store}>
            <div>
                <Layout title={'Algorithm Visualizer'}>
                    <AlgVisualizerRouting />
                </Layout>
            </div>
        </Provider>
    );
};

export default App;
