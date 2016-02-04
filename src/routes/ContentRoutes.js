import fetch from '../core/fetch';
import ContentPage from '../components/ContentPage';
import Root from '../components/Root';

const content = ["about", "index", "privacy"];

export function getContentRoute(location) {
  return fetch(`/api/content?path=${location.pathname}`).then(function(result) {
    return result.json();
  }).then(function(response) {
    return {component: ContentPage, props: response};
  });
}

export function getContentRoutes() {
  let routes = [];
  content.forEach((page) => {
    routes.push({
      path: '/' + page,
      component: Root,
      getIndexRoute(location, callback) {
        return getContentRoute(location).then(function(contentRoute) {
          callback(null, contentRoute);
        }).catch(callback);
      }
    });
  });
  return routes;
}
