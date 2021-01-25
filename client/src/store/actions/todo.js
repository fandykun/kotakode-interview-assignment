import * as actionTypes from "./actionTypes";

export const addTodo = (day, name) => {
  return {
    type: actionTypes.ADD_TODO,
    todoDay: day,
    todoName: name,
  };
};

export const deleteTodo = (todo) => {
  return {
    type: actionTypes.DELETE_TODO,
    todo: todo,
  };
};

export const completeTodo = (id) => {
  return {
    type: actionTypes.COMPLETE_TODO,
    todoId: id,
  };
};
