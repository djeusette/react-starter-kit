import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { syncHistory, routeReducer } from 'react-router-redux';
import { persistState } from 'redux-devtools';
import reducers from '../actions/reducers';
import DevTools from '../components/DevTools';
import Location from '../core/Location';

import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

export function configureStore(initialState, href) {
  let store = null;

  const reducer = combineReducers(Object.assign({}, reducers, {
    routing: routeReducer
  }));
  const reduxRouterMiddleware = syncHistory(Location);
  const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);

  if (__DEV__) {
    let currentLocation = (href ? href : window.location.href);

    const enhancer = compose(
      DevTools.instrument(),
      persistState(
        currentLocation.match(
          /[?&]debug_session=([^&]+)\b/
        )
      )
    );

    store = createStoreWithMiddleware(reducer, initialState, enhancer);

    if (module.hot) {
      module.hot.accept('../actions/reducers', () =>
        store.replaceReducer(require('../actions/reducers').default)
      );
    }
  } else {
    store = createStoreWithMiddleware(reducer, initialState);
  }

  reduxRouterMiddleware.listenForReplays(store);

  return store;
}
