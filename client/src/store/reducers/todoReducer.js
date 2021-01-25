import * as actionTypes from "../actions/actionTypes";
import { v4 as uuidv4 } from "uuid";

const addTodo = (state, action) => {
  const newTodo = {
    id: uuidv4(),
    day: action.todoDay,
    name: action.todoName,
    isCompleted: false,
  };

  return state.concat(newTodo);
};

const completeTodo = (state, action) => {
  let newState = [...state];
  newState.forEach((task, index) => {
    if (task.id === action.todoId) {
      newState[index].isCompleted = !newState[index].isCompleted;
      return newState;
    }
  });
  return newState;
};

const deleteTodo = (state, action) => {
  let newState = [...state];

  return newState.filter((todo) => todo !== action.todo);
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TODO:
      return addTodo(state, action);
    case actionTypes.UPDATE_TODO:
      return state;
    case actionTypes.COMPLETE_TODO:
      return completeTodo(state, action);
    case actionTypes.DELETE_TODO:
      return deleteTodo(state, action);

    default:
      return state;
  }
};

export { todoReducer };
