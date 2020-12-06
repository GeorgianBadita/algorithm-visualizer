import { combineReducers } from 'redux';
import { appReducer } from './app/reducer';
import { graphReducer } from './graph/reducer';

export const rootReducer = combineReducers({
    graph: graphReducer,
    app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
