import 'babel-polyfill';
import path from 'path';
import express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import routes from './routes';
import RouterContext from './CustomRouterContext';
import { match } from 'react-router';
import Html from './components/Html';
import assets from './assets';
import { port } from './config';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const server = global.server = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
server.use(express.static(path.join(__dirname, 'public')));

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api/content', require('./api/content').default);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '', entry: assets.main.js };
    const css = [];
    const context = {
      insertCss: styles => css.push(styles._getCss()),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        console.error(error);
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const store = configureStore({}, req.url);
        const component = <Provider store={store}><RouterContext {...renderProps} context={context} /></Provider>;
        data.body = ReactDOM.renderToString(component);
        data.css = css.join('');
        const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
        res.status(200).send('<!doctype html>\n' + html);
      } else {
        res.status(404).send('Not found')
      }
    });
  } catch (err) {
    next(err);
  }
});

//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});
