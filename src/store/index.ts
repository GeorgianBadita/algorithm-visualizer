import { combineReducers } from 'redux';
import { appReducer } from './app/reducer';
import { graphReducer } from './graph/reducer';
import { sortingRedcer } from './sorting/reducer';

export const rootReducer = combineReducers({
    graph: graphReducer,
    sorting: sortingRedcer,
    app: appReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
