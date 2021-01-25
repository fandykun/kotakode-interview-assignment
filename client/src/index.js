import React, { useReducer } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { v4 as uuidv4 } from "uuid";
import { days } from "./utils/todo";

import { TodoContext } from "./context";
import { todoReducer } from "./store/reducers";

export const BaseApp = () => {
  const initialTodoState = [
    { id: uuidv4(), day: days[0], name: "Cuci Baju", isCompleted: false },
    { id: uuidv4(), day: days[1], name: "Cuci Baju", isCompleted: false },
    { id: uuidv4(), day: days[2], name: "Cuci Baju", isCompleted: false },
    { id: uuidv4(), day: days[3], name: "Cuci Baju", isCompleted: false },
    { id: uuidv4(), day: days[4], name: "Cuci Baju", isCompleted: false },
    { id: uuidv4(), day: days[5], name: "Cuci Baju", isCompleted: false },
    { id: uuidv4(), day: days[6], name: "Cuci Baju", isCompleted: false },
  ];

  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodoState);

  return (
    <TodoContext.Provider value={{ todos, dispatchTodos }}>
      <App />
    </TodoContext.Provider>
  );
};

ReactDOM.render(<BaseApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
