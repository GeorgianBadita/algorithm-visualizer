import React from 'react';
import Layout from './hoc/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlgVisualizerRouting from './containers/AlgVisualizerRouting';
import { Provider } from 'react-redux';
import { GraphAlgoirhtmsType } from './utils/types/graph-algorithms/algorithm-types';

type AppProps = {
    store: any;
};

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
