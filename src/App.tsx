import React from 'react';
import Layout from './hoc/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlgVisualizerRouting from './containers/AlgVisualizerRouting';

const App = (): JSX.Element => {
    return (
        <div>
            <Layout title={'Algorithm Visualizer'}>
                <AlgVisualizerRouting />
            </Layout>
        </div>
    );
};

export default App;
