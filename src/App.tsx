import React from 'react';
import Layout from './hoc/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlgVisualizerRouting from './containers/AlgVisualizerRouting';
import { Provider } from 'react-redux';
import { GraphAlgoirhtmsType } from './utils/types/graph-algorithms/algorithm-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';

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
                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </Provider>
    );
};

export default App;
