import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import EventEmitter from 'eventemitter3';
// import waterfall from 'async/waterfall';
// import Promise from 'bluebird';
// import moment from 'moment';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reactCookie from 'react-cookie';
import Root from './components/Root';
import Db from './stores/db';
import Stores from './stores';
import Sockets from './stores/sockets';
import routes from './routes';
import request from './lib/request';
import Api from './api';

const events = new EventEmitter();
const db = new Db(events);
const stores = new Stores();

let sockets;
const rootElement = document.getElementById('root');
const token = reactCookie.load('accessToken');
const authenticated = () => {
  const authUser = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0];
  const user = authUser ? JSON.parse(localStorage.getItem(authUser)) : authUser;
  return user;
};

const render = () => {
  const r = routes(stores.stores.auth);
  const context = Object.assign(
    {
      db,
      sockets,
    },
    stores.stores
  );

  ReactDOM.render(<Root context={context} history={browserHistory} routes={r} />, rootElement);
};

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

if (authenticated()) {
  const req = request(authenticated().uid);
  const api = new Api(req, events);
  stores.init(db, events, api).then(
    (data) => {
      console.log(stores);
      stores.stores.auth.setupAuth(authenticated());
      sockets = new Sockets();
      sockets.init(events);
      render();
      // stores.stores.auth.authenticated = true;
      // stores.stores.auth.user = JSON.parse(user);
    }
  );
  // console.log('db', db);
} else {
  const api = new Api(null, events);
  stores.init(db, events, api).then(
    (data) => {
      console.log(stores);
      stores.stores.auth.authenticated = false;
      sockets = new Sockets();
      sockets.init(events);
      render();
    }
  );
}


if (module.hot) {
  /*
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers');
    store.replaceReducer(nextRootReducer);
  });
  */
  module.hot.dispose(() => {

  });
}
