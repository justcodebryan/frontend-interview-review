class FakeTimer {
  constructor() {
    this.original = {
      setTimeout: window.setTimeout,
      clearTimeout: window.clearTimeout,
      dateNow: Date.now
    };
    this.uuid = 0;
    this.currentTime = 0;
    this.queue = [];
  }

  install () {
    window.setTimeout = (func, delay) => {
      const id = this.uuid++;
      this.queue.push({
        id,
        func,
        time: this.currentTime + delay,
        args
      });
      this.queue.sort((a, b) => a.time - b.time);
      return id;
    };
    window.clearTimeout = (id) => {
      this.queue = this.queue.filter(timer => timer.id !== id);
    };
    Date.now = () => {
      return this.currentTime;
    };
  }

  uninstall () {
    window.setTimeout = this.original.setTimeout;
    window.clearTimeout = this.original.clearTimeout;
    Date.now = this.original.dateNow;
  }

  tick () {
    while (this.queue.length) {
      const { func, time, args } = this.queue.shift();
      this.currentTime = time;
      func.apply(null, args);
    }
  }
}