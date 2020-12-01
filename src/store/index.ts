import { combineReducers } from 'redux';
import { graphReducer } from './graph/reducer';

export default combineReducers({
    graph: graphReducer,
});
