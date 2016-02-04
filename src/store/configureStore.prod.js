import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistory, routeReducer } from 'react-router-redux';
import reducers from '../actions/reducers';
import Location from '../core/Location';

export function configureStore(initialState, href = null) {
  const reducer = combineReducers(Object.assign({}, reducers, {
    routing: routeReducer
  }));
  const reduxRouterMiddleware = syncHistory(Location);
  const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);
  const store = createStoreWithMiddleware(reducer, initialState);
  reduxRouterMiddleware.listenForReplays(store);
  return store;
}
