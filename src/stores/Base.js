import { observable, action } from 'mobx';

export default class Base {
  api;
  @observable db;
  @observable events;

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

  isNumeric(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  }

  @action updateCollectionFields(collection, id, updates) {
    return this.db.updateCollectionFields(collection, id, updates);
  }

  @action deleteRecord(collection, id) {
    return this.db.deleteRecord(collection, id);
  }
}