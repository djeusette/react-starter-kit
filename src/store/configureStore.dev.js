import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { syncHistory, routeReducer } from 'react-router-redux';
import { persistState } from 'redux-devtools';
import reducers from '../actions/reducers';
import Location from '../core/Location';
import DevTools from '../components/DevTools';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

export function configureStore(initialState, href = null) {
  const reducer = combineReducers(Object.assign({}, reducers, {
    routing: routeReducer
  }));
  const reduxRouterMiddleware = syncHistory(Location);
  const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);
  let currentLocation = (href ? href : (canUseDOM ? window.location.href : null));
  const enhancer = compose(
    DevTools.instrument(),
    persistState(currentLocation.match(/[?&]debug_session=([^&]+)\b/))
  );
  const store = createStoreWithMiddleware(reducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../actions/reducers', () =>
      store.replaceReducer(require('../actions/reducers').default)
    );
  }

  reduxRouterMiddleware.listenForReplays(store);
  return store;
}
