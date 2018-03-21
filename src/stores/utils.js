import {
  observable,
  autorun,
  computed,
  toJS,
  action
} from 'mobx';
import {
  filter,
  sortBy,
  orderBy,
  first,
  map,
  reverse,
  find,
  uniqueId,
  pick,
  uniqBy
} from 'lodash/fp';
import moment from 'moment-timezone';
import waterfall from 'async/waterfall';
import axios from 'axios';
import Promise from 'bluebird';

export default class Utils {
  api;
  @observable db;
  @observable events;
  @observable isUpdating = false;

  constructor(db, events, api) {
    if (db) {
      this.setupDb(db);
    }
    if (events) {
      this.setupEvents(events);
    }
    if (api) {
      this.setupApi(api);
    }
  }

  setupApi(api) {
    this.api = api;
  }

  setupDb(db) {
    this.db = db;
  }

  setupEvents(events) {
    this.events = events;
  }

  async resetDatabase() {
    this.db.clear();
    const data = await this.api.utils.getAllTables();
    const payload = {
      payload: {
        data: {
          collection: data,
          type: 'initialize',
        },
      },
    };
    this.events.emit('db', payload);
  }

  importUsers(data, families, people, reset) {
    return axios.post(
      '/api/import',
      {
        data,
        families,
        people,
        reset,
      }
    )
    .then(
      (response) => Promise.resolve(response.data)
    )
    .catch(
      (response) => Promise.resolve(response.data)
    );
  }
}