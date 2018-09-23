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
import Cookie from 'js-cookie';
import { JL } from 'jsnlog';
import Root from './containers/Root';
import Db from './stores/db';
import Stores from './stores';
import Sockets from './stores/sockets';
import request from './lib/request';
import Api from './api';
import { fb as firebase } from './lib/auth';
import settings from '../config/webSettings';
let api;
const cookieUserKey = 'evangelize-user-id';

const beforeSend = (xhr) => {
  xhr.setRequestHeader('authorization', 'Bearer');
};
const appender = JL.createAjaxAppender('authorization');
appender.setOptions({
  beforeSend,
});
JL.setOptions({
  appenders: [appender],
  defaultAjaxUrl: `${settings.serverUrl}api/logging/add`,
});
JL().info('testing');

const onError = (error, errorInfo, props) => {
  const errorMsg = error;
  const url = null;
  const lineNumber = null;
  const column = null;
  JL('onerrorLogger').fatalException(
    {
      msg: 'Uncaught Exception',
      errorMsg,
      url,
      'line number': lineNumber,
      column,
    },
    error,
  );
  return false;
};

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const events = new EventEmitter();
const db = new Db(events);
const stores = new Stores();
const history = syncHistoryWithStore(browserHistory, routingStore);


let sockets;
const rootElement = document.getElementById('root');
const userId = Cookie.get(cookieUserKey);
const localAuthentication = async () => {
  let user;
  // const db = indexedDB.open(`firebase:authUser:${settings.firebase.apiKey}:[DEFAULT]`, 1);
  try {
    const redirectResult = firebase.auth().currentUser;
    console.log(redirectResult);
    /*
    if (redirectResult.credential) {
      user = redirectResult.user;
      const priorAuth = sessionStorage.getItem('auth-issue');
      if (priorAuth) {
        const cred = firebaseAuth.FacebookAuthProvider.credential(JSON.parse(priorAuth).credentials.accessToken);
        await user.linkWithCredential(cred);
        sessionStorage.removeItem('auth-issue');
      }
    } else {
      const authUser = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0];
      user = authUser ? JSON.parse(localStorage.getItem(authUser)) : authUser;
    }
    */
  } catch (e) {
    const code = (e.code) ? e.code : null;
    const credentials = (e.credential) ? e.credential : null;
    const errorMessage = (e.message) ? e.message : null;
    const email = (e.email) ? e.email : null;
    /*
    if (credentials) {
      const providers = await fetchProvidersForEmail(email);
      console.log(code, errorMessage, email, providers);
      sessionStorage.setItem(
        'auth-issue',
        JSON.stringify(
          {
            code,
            provider: providers[0],
            credentials,
          }
        )
      );
    } else {
      console.log(e);
      throw e;
    }
    */
  }
  return user;
};

const render = () => {
  const context = Object.assign(
    {
      db,
      sockets,
      routing: routingStore,
    },
    stores.stores
  );

  ReactDOM.render(<Root context={context} history={history} onError={onError} />, rootElement);
};

const eventHandler = (payload) => {
  if (payload === 'databaseInit:complete') {
    if (routingStore.location.search.includes('?next=')) {
      const path = routingStore.location.search.replace('?next=', '');
      routingStore.push(path);
    } else if (routingStore.location.pathname === '/login') {
      routingStore.push('/dashboard');
    }
  } else if (payload === 'user-loaded' || payload === 'no-user-loaded') {
    document.getElementById('loading').outerHTML = '';
    render();
    if (payload === 'user-loaded') {
      // routingStore.push('/login');
      sockets = new Sockets();
      sockets.init(events, api);
    }
  }
};

events.on('app', eventHandler);

// Needed for onClick
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
api = new Api(null, events);
stores.init(db, events, api, onError).then(
  (data) => {
    stores.stores.auth.setShowSplash(true);
  }
).catch( 
  (e) => {
    console.log(e);
  }
);

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
