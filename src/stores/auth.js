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
import {
  firebaseAuth,
  googleProvider,
  facebookProvider,
  anonymousAuthenticate,
  googleAuthenticateRedirect,
  facebookAuthenticateRedirect,
  getRedirectResult,
  currentUser,
  fetchProvidersForEmail,
} from '../lib/auth';
import request from '../lib/request';

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

  constructor(db, events, api, onError) {
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

  setupAuth(localAuth) {
    const self = this;
    const auth = firebaseAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        const currUser = currentUser();
        self.user = {
          firebase: user,
          db: null,
          userId: user.uid,
        };
        Cookie.set(cookieUserKey, self.userId, { expires: 7 });
        console.log('user auth', user);
        self.finalizeLogin();
      } else {
        self.user.firebase = null;
        self.user.db = null;
        self.userId = null;
        Cookie.remove(cookieUserKey);
        console.log('user logged out');
      }
    });
    auth.getUid(localAuth.uid);
  }

  @action async checkUser() {
    const { jwt, user } = await this.api.auth.thirdPartyLogin('google', this.user.firebase);
    return { jwt, user };
  }

  async login(type) {
    const self = this;
    const priorAuth = sessionStorage.getItem('auth-issue');
    let results;
    let error;
    let providers;
    let currUser = currentUser();
    if (this.user && this.user.firebase) {
      results = this.user.firebase;
    } else {
      try {
        if (type === 'facebook' && priorAuth) {
          results = await facebookAuthenticateRedirect();
        } else if (type === 'facebook') {
          results = await facebookAuthenticateRedirect();
        } else if (type === 'google' && priorAuth) {
          results = await googleAuthenticateRedirect();
        } else if (type === 'google') {
          results = await googleAuthenticateRedirect();
        }
        currUser = currentUser();
        self.user = {
          firebase: currUser,
          db: null,
          userId: currUser.uid,
        };
        self.userId = self.user.firebase.uid;
        const req = request(self.userId);
        this.api.init(req);
        await this.finalizeLogin();
      } catch (e) {
        error = e;
        if (error.code === 'auth/account-exists-with-different-credential') {
          providers = await fetchProvidersForEmail(error.email);
          console.log(providers);
        }
        this.error(e, null, null);
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
    await this.getAuthToken();
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

  async getAuthToken(force) {
    const redirectResult = await getRedirectResult();
    this.authToken = await this.user.firebase.getIdToken(true);
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
    return await this.api.utils.getAllTables(this.db.store.lastUpdate);
  }

  @computed get userFullName() {
    const name = (this.user && this.user.db && this.user.db.person) ? this.user.db.person.firstName + ' ' + this.user.db.person.lastName : 'User Name';
    return name;
  }

  @action setShowSplash(state) {
    this.showSplash = state;
  }

}
