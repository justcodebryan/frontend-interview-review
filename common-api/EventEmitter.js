class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe (eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [callback];
    } else {
      this.events[eventName].push(callback);
    }
    return new Subscription(this.events, eventName, callback);
  }

  emit (eventName, ...args) {
    if (this.events[eventName]) {
      for (const cb of this.events[eventName]) {
        cb.apply(null, args);
      }
    }
  }
}

class Subscription {
  constructor(subscriber, eventName, callback) {
    this.subscriber = subscriber;
    this.eventName = eventName;
    this.callback = callback;
  }

  release () {
    const eventFilter = event => event === this.eventName;
    this.subscriber[this.eventName] = this.subscriber[this.eventName].filter(eventFilter);
  }
}
