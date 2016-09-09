export class Socket {
  constructor() {
    this.socket = null;
    this.events = new EventEmitter2();
    this.url = `ws://${window.location.hostname}:9950`;
    this.reconnectInterval = null;
  }

  send(type, data) {
    if (this.socket && !this.socket.OPEN) { return; }
    this.socket.send(JSON.stringify({
      type: type,
      data: data
    }));
  }

  connect() {
    this.events.emit({ type: 'state', data: 0 });
    this.socket = new WebSocket(this.url);
    this.handlers();
  }

  reconnect() {
    clearInterval(this.reconnectInterval);
    this.reconnectInterval = setInterval(() => {
      this.connect();
    }, 5000);
  }

  handlers() {
    this.socket.onopen = () => {
      if (this.reconnectInterval) { clearInterval(this.reconnectInterval); }
      this.events.emit('connection', this.socket.readyState);
      this.state = this.socket.readyState;
    };

    this.socket.onclose = () => {
      this.events.emit('connection', this.socket.readyState);
      this.reconnect();
    };

    this.socket.onerror = err => {
      this.events.emit('connection', this.socket.readyState);
      this.reconnect();
    };

    this.socket.onmessage = msg => {
      this.events.emit('message', msg);
    };
  }

  getSocket() {
    return this.socket;
  }
}
