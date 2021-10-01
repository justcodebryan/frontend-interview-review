// MyEventEmitter
class EventEmitter {
  constructor() {
    this.eventList = {};
  }

  on(eventName, callback) {
    this.eventList[eventName] = this.eventList[eventName] || [];
    this.eventList[eventName].push(callback);
  }

  once(eventName, data) {
    if (this.eventList[eventName]) {
      this.eventList[eventName].forEach(callback => {
        callback(data);
      });
      delete this.eventList[eventName];
    }
  }

  emit(eventName, data) {
    if (this.eventList[eventName]) {
      this.eventList[eventName].forEach(callback => {
        callback(data);
      });
    }
  }

  off(eventName, fn) {
    if (this.eventList[eventName]) {
      const newEventList = fn ? this.eventList.filter(el => el !== fn) : [];
      this.eventList[eventName] = newEventList;
    }
  }
}
