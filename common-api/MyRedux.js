const ADD = 'ADD';
const MINUS = 'MINUS';

class Dispatcher {
  constructor() {
  }
}

function add(type) {
  const action = {
    type: ADD
  }

}

const defaultStore = 0;

class Store {
  constructor(store) {
    this.store = store || defaultStore;
    this.dispatcher = new Dispatcher();
  }

  reduce(state, action) {
    switch (action.type) {
      case ADD:
        return state + 1;
      case MINUS:
        return state - 1;
      default:
        return state;
    }
  }
}


