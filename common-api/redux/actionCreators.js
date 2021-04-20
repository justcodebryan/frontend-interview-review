import { ADD_TODO } from './actionContants';
import { TodoDispatcher } from './todoDispatcher';

function addTodo(desc) {
  const action = {
    type: ADD_TODO,
    payload: {
      id: Date.now(),
      done: false,
      desc
    }
  };
  TodoDispatcher.dispatch(action);
}
