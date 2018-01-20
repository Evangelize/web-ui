import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { Router } from 'react-router';
import { inject, observer } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import EventEmitter from 'eventemitter3';
// import waterfall from 'async/waterfall';
// import Promise from 'bluebird';
// import moment from 'moment';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reactCookie from 'react-cookie';
import Root from './containers/Root';
import Db from './stores/db';
import Stores from './stores';
import Sockets from './stores/sockets';
import request from './lib/request';
import Api from './api';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const events = new EventEmitter();
const db = new Db(events);
const stores = new Stores();
const history = syncHistoryWithStore(browserHistory, routingStore);


let sockets;
const rootElement = document.getElementById('root');
const token = reactCookie.load('accessToken');
const localAuthentication = () => {
  const authUser = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0];
  const user = authUser ? JSON.parse(localStorage.getItem(authUser)) : authUser;
  return user;
};

const eventHandler = (payload) => {
  if (payload === 'databaseInit:complete') {
    if (routingStore.location.search.includes('?next=')) {
      const path = routingStore.location.search.replace('?next=', '');
      routingStore.push(path);
    } else {
      routingStore.push('/dashboard');
    }
  }
};

events.on('app', eventHandler);

const render = () => {
  const context = Object.assign(
    {
      db,
      sockets,
      routing: routingStore,
    },
    stores.stores
  );

  ReactDOM.render(<Root context={context} history={history} />, rootElement);
};

// Needed for onClick
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
const localAuth = localAuthentication();
if (localAuth) {
  const req = request(localAuth.uid);
  const api = new Api(req, events);
  stores.init(db, events, api).then(
    (data) => {
      console.log(stores);
      stores.stores.auth.setupAuth(localAuth);
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
      stores.stores.auth.setShowSplash(false);
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
