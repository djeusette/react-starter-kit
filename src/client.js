/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import RouterContext from './CustomRouterContext';
import routes from './routes';
import { Router, match } from 'react-router';
import Location from './core/Location';
import { addEventListener } from './core/DOMUtils';
import { createLocation } from 'history';

let cssContainer = document.getElementById('css');
const appContainer = document.getElementById('app');
const context = {
  insertCss: styles => styles._insertCss(),
  onSetTitle: value => document.title = value,
  onSetMeta: (name, content) => {
    // Remove and create a new <meta /> tag in order to make it work
    // with bookmarks in Safari
    const elements = document.getElementsByTagName('meta');
    [].slice.call(elements).forEach((element) => {
      if (element.getAttribute('name') === name) {
        element.parentNode.removeChild(element);
      }
    });
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document.getElementsByTagName('head')[0].appendChild(meta);
  },
};

function render(props) {
  const renderFn = function(props) {
    return <RouterContext {...props} />;
  }

  // const component = <Router history={Location} routes={routes} render={routerRender} context={context} />;

  console.log("---- props", props);

  const component = <Router {...props} render={renderFn} context={context} />;

  ReactDOM.render(component, appContainer, () => {
    // Remove the pre-rendered CSS because it's no longer used
    // after the React app is launched
    if (cssContainer) {
      cssContainer.parentNode.removeChild(cssContainer);
      cssContainer = null;
    }
  });
}

function run() {
  // Make taps on links and buttons work fast on mobiles
  FastClick.attach(document.body);

  // const location = createLocation(window.location);

  match({ history: Location, routes: routes }, (error, redirectLocation, renderProps) => {
    console.log("--- Client - after match");
    render(renderProps);
  });

  // match({ routes, location }, () => {
  //   render();
  // });
}

// Run the application when both DOM is ready and page content is loaded
if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}
