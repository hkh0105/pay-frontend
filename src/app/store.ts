import { Dispatch } from 'react-redux';
import { routerMiddleware, routerReducer, RouterState } from 'react-router-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import { env, history } from 'app/config';
import { environmentReducer, environmentSaga, EnvironmentState } from 'app/services/environment';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}

function* rootSaga(dispatch: Dispatch<RootState>) {
  yield all([
    // userRootSaga(),
    // trackingSaga(),
    environmentSaga()
  ]);
}

export interface RootState {
  router: RouterState;
  // user: UserState;
  environment: EnvironmentState;
}

const composeEnhancers = env.isDevelopment
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose;
const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
  router: routerReducer,
  // user: userReducer,
  environment: environmentReducer
});

const enhancers = composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware));

export const store = createStore(reducers, enhancers);

sagaMiddleware.run(rootSaga, store.dispatch);
