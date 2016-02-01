import App from '../components/App';
import ContactRoute from './ContactRoute';
import LoginRoute from './LoginRoute';
import RegisterRoute from './RegisterRoute';
import { getContentRoute } from './ContentRoutes';

export default {
  path: '/',
  component: App,
  getChildRoutes(location, callback) {
    callback(null, [ ContactRoute, LoginRoute, RegisterRoute ]);
  },
  getIndexRoute(location, callback) {
    return getContentRoute(location).then(function(contentRoute) {
      callback(null, contentRoute);
    }).catch(callback);
  }
};
