import fetch from '../core/fetch';
import ContentPage from '../components/ContentPage';
import App from '../components/App';

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
      component: App,
      getIndexRoute(location, callback) {
        getContentRoute(location).then(function(contentRoute) {
          console.log("--- GOT content route", contentRoute);
          callback(null, contentRoute);
        });
      }
    });
  });
  return routes;
}
