class _LazyMan {
  constructor(name) {
    this.name = name;
    this.taskList = [];
    const task = () => {
      console.log(`Hi! This is ${this.name}`);
      this.next();
    };
    this.taskList.push(task);
    setTimeout(() => {
      this.next();
    }, 0);
  }

  next() {
    const task = this.taskList.shift();
    task && task();
  }

  sleep(time) {
    this._sleepWrapper(time, false);
    return this;
  }

  sleepFirst(time) {
    this._sleepWrapper(time, true);
    return this;
  }

  _sleepWrapper(time, isFirst) {
    const task = () => {
      return setTimeout(() => {
        console.log(`wake up in ${time} second`);
        this.next();
      }, time * 1000);
    };

    if (isFirst) {
      this.taskList.unshift(task);
    } else {
      this.taskList.push(task);
    }
  }

  eat(food) {
    const task = () => {
      console.log(`Eating ${food}`);
      this.next();
    };
    this.taskList.push(task);
    return this;
  }
}

function LazyMan(name) {
  return new _LazyMan(name);
}

LazyMan("Hank").eat("dinner").sleepFirst(3);
