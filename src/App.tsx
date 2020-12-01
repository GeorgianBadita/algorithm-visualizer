import React from 'react';
import Layout from './hoc/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlgVisualizerRouting from './containers/AlgVisualizerRouting';
import { CombinedState, Store } from 'redux';
import { Provider } from 'react-redux';
import { GraphActionTypes } from './store/graph/types';

type AppProps = {
    store: Store<CombinedState<unknown>, GraphActionTypes>;
};

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
