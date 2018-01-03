import { observable } from 'mobx';

export default class Messages {
  api;
  @observable db;
  @observable events;

  constructor(db, events, api) {
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

  setupEvents(events) {
    this.events = events;
  }

  subscribe(channel, cb) {
    this.events.on(channel, cb.bind(this));
  }
}
