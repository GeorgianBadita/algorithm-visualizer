import React from 'react';
import Layout from './hoc/Layout';
import AlgVisualizerRouting from './containers/AlgVisualizerRouting';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';

type AppProps = {
    store: any;
};

const App = (props: AppProps): JSX.Element => {
    return (
        <Provider store={props.store}>
            <div>
                <Layout>
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
