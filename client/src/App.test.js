import React, { useReducer } from "react";
import { fireEvent, render, cleanup } from "@testing-library/react";
import App from "./App";
import { TodoContext } from "./context";
import { todoReducer } from "./store/reducers";

const TestApp = () => {
  const initialTodoState = [
    { id: 123, day: "Senin", name: "Beli buku", isCompleted: false },
  ];

  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodoState);
  return (
    <TodoContext.Provider value={{ todos, dispatchTodos }}>
      <App />
    </TodoContext.Provider>
  );
};

afterEach(cleanup);

describe("task form", () => {
  it("updates on change input", async () => {
    const { getByTestId } = render(<TestApp />);
    const taskInput = getByTestId("task-input-form").querySelector("input");
    fireEvent.change(taskInput, { target: { value: "Beli Buku" } });
    expect(taskInput.value).toBe("Beli Buku");
  });

  it("updates on select day input", async () => {
    const { getByTestId } = render(<TestApp />);
    const dayInput = getByTestId("day-input-form").querySelector("input");
    fireEvent.change(dayInput, { target: { value: "Senin" } });
    expect(dayInput.value).toBe("Senin");
  });
});
