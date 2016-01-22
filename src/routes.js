import fetch from './core/fetch';
import App from './components/App';
import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';

const content = ["about", "index", "privacy"];

let ContactRoute = {
  path: '/contact',
  component: ContactPage
};

let LoginRoute = {
  path: '/login',
  component: LoginPage
};

let RegisterRoute = {
  path: '/register',
  component: RegisterPage
};

let NotFoundRoute = {
  path: '/*',
  component: NotFoundPage
}

let ErrorRoute = {
  component: ErrorPage
}

const content = ['about', 'index', 'privacy'];

function getContentRoute(location, callback) {
  return fetch(`/api/content?path=${location.pathname}`).then(function(result) {
    return result.json();
  }).then(function(response) {
    callback(null, {component: ContentPage, props: response});
  });
}

function getContentRoutes() {
  let routes = [];
  content.forEach((page) => {
    routes.push({
      path: '/' + page,
      component: App,
      getIndexRoute(location, callback) {
        getContentRoute(location, callback);
      }
    });
  });
  return routes;
}

let RootRoute = {
  path: '/',
  component: App,
  getChildRoutes(location, callback) {
    callback(null, [ContactRoute, LoginRoute, RegisterRoute, NotFoundRoute]);
  },
  getIndexRoute(location, callback) {
    getContentRoute(location, callback);
  }
};

let NotFoundRoute = {
  path: '*',
  component: NotFoundPage
};

export default [RootRoute, ...getContentRoutes(), NotFoundRoute];
