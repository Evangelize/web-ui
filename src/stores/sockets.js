import ReconnectableWebSocket from 'reconnectable-websocket';
import Cookie from 'js-cookie';
import 'setimmediate';
import settings from '../../config/webSettings';

export default class Sockets {
  api;
  client;
  events;
  connected = false;

  init(events, options, api) {
    if (options) {
      this.options = options;
    }
    if (events) {
      this.setupEvents(events);
    }
    this.setupWs();
    if (api) {
      this.setupApi(api);
    }
  }

  setupApi(api) {
    this.api = api;
  }

  setupWs() {
    const token = Cookie.get('accessToken');
    if (token) {
      const proto = (window.location.protocol === 'http:') ? 'ws:' : 'wss:';
      let websocketUri = (settings.websocket && settings.websocket.host) ? `//${settings.websocket.host}` : '//localhost:3002';
      websocketUri = `${proto}${websocketUri}?token=${token}`;
      //websocketUri = `${proto}${websocketUri}`;
      this.client = new ReconnectableWebSocket(
        websocketUri,
        undefined,
        {
          automaticOpen: false,
        }
      );
      this.client.onmessage = this.onMessage.bind(this);
      this.client.onerror = this.onError.bind(this);
      this.client.onclose = this.onClose.bind(this);
      this.client.onopen = this.onMessage.bind(this);
      this.client.open();
      console.log('websocket', this.client);
      this.connected = true;
    }
    return true;
  }

  setupEvents(events) {
    this.events = events;
    this.events.on('socket', this.send.bind(this));
  }

  send(data) {
    if (this.connected) {
      this.client.send(JSON.stringify(data));
    }
  }

  onError(e) {
    console.log(e);
  }

  onClose(e) {
    console.log(e);
    this.events.emit('auth', 'refresh-jwt');
  }

  onMessage(message) {
    console.log('socket:onMessage', message);
    const data = (message.data) ? JSON.parse(message.data) : {};
    if ('payload' in data) this.events.emit('db', data);
    if (data.type === 'info') this.events.emit('broadcast', data);
    if (message.type === 'open') {
      this.events.emit('auth', 'refresh-data');
    }
  }

}
