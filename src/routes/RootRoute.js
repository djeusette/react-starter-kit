import App from '../components/App';
import { getContentRoute } from './ContentRoutes';

// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

export default {
  path: '/',
  component: App,
  getChildRoutes(location, callback) {
    require.ensure([], (require) => {
      callback(null, [ require('./ContactRoute'), require('./LoginRoute'), require('./RegisterRoute') ]);
    });

    // callback(null, [ContactRoute, LoginRoute, RegisterRoute]);
  },
  getIndexRoute(location, callback) {
    getContentRoute(location).then(function(contentRoute) {
      callback(null, contentRoute);
    });
  }
};
