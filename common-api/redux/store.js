import { ReduceStore } from 'flux/utils';
import { TodoDispatcher } from './todoDispatcher';
import { ADD_TODO } from './actionContants';

class TodoStore extends ReduceStore {
  constructor() {
    super(TodoDispatcher);
  }

  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch (action) {
      case ADD_TODO:
        return state.concat(action.payload);
      default:
        return state;
    }
  }
}

export const todoStore = new TodoStore();
