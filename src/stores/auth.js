import {
  observable,
  autorun,
  computed,
  toJS,
  action
} from 'mobx';
import moment from 'moment-timezone';
import axios from 'axios';
import Cookie from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { fb as firebase } from '../lib/auth';
import request from '../lib/request';

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const cookieUserKey = 'evangelize-user-id';
const accessToken = 'accessToken';

export default class Auth {
  client;
  error;
  events;
  request;
  api;
  @observable db;
  @observable authenticated = false;
  @observable showSplash = true;
  @observable user = {
    db: null,
    firebase: null,
  };
  @observable userId;
  @observable authToken;
  @observable checked = false;

  constructor(db, events, api, onError) {
    const self = this;

    if (db) {
      this.setupDb(db);
    }
    if (events) {
      this.setupEvents(events);
    }
    if (api) {
      this.setupApi(api);
    }
    if (onError) {
      this.setupError(onError);
    }

    firebase.auth().onAuthStateChanged((user) => {
      self.checked = true;
      if (user) {
        self.user.firebase = user;
        self.userId = user.uid;
        Cookie.set(cookieUserKey, self.userId, { expires: 7 });
        console.log('user auth', user);
        self.finalizeLogin();
      } else {
        self.user.firebase = null;
        self.user.db = null;
        self.userId = null;
        Cookie.remove(cookieUserKey);
        self.events.emit('app', 'no-user-loaded');
        self.showSplash = false;
        console.log('user logged out');
      }
    });
  }

  setupApi(api) {
    this.api = api;
  }

  setupDb(db) {
    this.db = db;
  }

  setupError(onError) {
    this.error = onError;
  }

  @action setUser(user) {
    this.user = user;
  }

  checkIfRoot = () => {
    const url = new URL(window.location.href);
    if (url.pathname === '/') {
      this.showAdd = true;
    }
  }

  setupAuth(localAuth) {
    const self = this;
    const currUser = firebase.auth().currentUser;
    self.user = {
      firebase: currUser,
      db: null,
      userId: currUser.uid,
    };
    Cookie.set(cookieUserKey, currUser.uid, { expires: 7 });
    console.log('user auth', currUser);
    self.finalizeLogin();
    auth.getUid(localAuth.uid);
  }

  @action async checkUser() {
    const { jwt, user } = await this.api.auth.thirdPartyLogin('google', this.user.firebase);
    return { jwt, user };
  }

  async login(type) {
    let results;
    let error;
    let providers;
    if (this.user.firebase) {
      results = this.user.firebase;
    } else {
      try {
        if (type === 'facebook' && this.user.firebase) {
          results = await firebase.auth().currentUser.linkWithPopup(facebookProvider);
        } else if (type === 'facebook') {
          results = await firebase.auth().signInWithRedirect(facebookProvider);
        } else if (type === 'google' && this.user.firebase) {
          results = await firebase.auth().currentUser.linkWithPopup(googleProvider);
        } else if (type === 'google') {
          results = await firebase.auth().signInWithRedirect(googleProvider);
        }
        this.user.firebase = results;
        this.userId = this.user.firebase.user.uid;
        await this.finalizeLogin();
      } catch (e) {
        error = e;
        if (error.code === 'auth/account-exists-with-different-credential') {
          providers = await firebase.auth().fetchProvidersForEmail(error.email);
          console.log(providers);
        }
      }
    }
    console.log(error, results);
    return { error, results, providers };
  }

  getUserCookie() {
    return Cookie.get(cookieUserKey);
  }

  @action async refreshJwt() {
    let retVal;
    try {
      const { jwt, user } = await this.checkUser();
      this.user.db = user;
      this.db.setEntityId(this.user.db.person.entityId || null);
      const tokn = jwtDecode(jwt);
      Cookie.set(accessToken, jwt, { expires: moment(tokn.exp, 'X').toDate() });
      retVal = tokn;
    } catch (e) {
      console.log(e);
      retVal = e;
    }

    return retVal;
  }

  async finalizeLogin() {
    this.getAuthToken();
    const req = request(this.userId);
    this.events.emit('api', 'init', req);
    // this.setupRefreshToken();
    // this.setupRequest();
    try {
      const { jwt, user } = await this.checkUser();
      this.user.db = user;
      this.db.setEntityId(this.user.db.person.entityId || null);
      const tokn = jwtDecode(jwt);
      Cookie.set(accessToken, jwt, { expires: moment(tokn.exp, 'X').toDate() });
      try {
        const data = await this.getAllTables();
        const payload = {
          payload: {
            data: {
              collection: data,
              type: 'initialize',
            },
          },
        };
        this.setShowSplash(false);
        this.authenticated = true;
        this.events.emit('db', payload);
        this.events.emit('app', 'user-loaded');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.setShowSplash(false);
          console.log(error);
        }
        this.error(error, null, null);
      }
    } catch (err) {
      if (err.response && err.response && err.response.status === 401) {
        console.log(err);
        this.setShowSplash(false);
      } else {
        this.setShowSplash(false);
        this.authenticated = true;
      }
      this.error(err, null, null);
    }
    // this.setupUserProfile()
    return this.user;
  }

  setupEvents(events) {
    this.events = events;
    this.events.on('auth', this.eventHandler.bind(this));
  }

  eventHandler(type, payload) {
    if (type === 'refresh-jwt') {
      this.refreshJwt();
    } else if (type === 'refresh-data') {
      this.getAllTables();
    }
  }

  getAuthToken(force) {
    this.authToken = this.user.firebase.getIdToken(true)
    return this.authToken;
  }

  setupRequest() {
    this.request = axios.create({
      timeout: 10000,
      headers: { 'X-Authorization': this.authToken },
    });

    this.request.interceptors.response.use(
      null, 
      (error) => {
        if (error.response && error.response.status === 401) {
          window.location = '/login';
        }
        console.log('error', error);
        this.error(error, null, null);
        throw error
      }
    )
  }

  async authenticate(email, password, callback) {
    const result = this.api.auth.login(email, password);
    if (result) {
      const token = jwtDecode(result.jwt);
      Cookie.set(accessToken, result.jwt, { expires: moment(token.exp, 'X').toDate() });
      this.authenticated = true;
      console.log('user', result.user);
      this.user.db = result.user;
    } else {
      console.log('unauthorized');
    }
    return this.authenticated;
  }

  async getAllTables() {
    if ('utils' in this.api) {
      return await this.api.utils.getAllTables(this.db.store.lastUpdate);
    } else {
      return Promise.reject();
    }
  }

  @computed get userFullName() {
    const name = (this.user && this.user.db && this.user.db.person) ? this.user.db.person.firstName + ' ' + this.user.db.person.lastName : 'User Name';
    return name;
  }

  @action setShowSplash(state) {
    this.showSplash = state;
  }

}
