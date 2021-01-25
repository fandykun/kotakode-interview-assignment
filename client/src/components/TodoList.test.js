import React, { useReducer } from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";
import { TodoContext } from "../context";
import { todoReducer } from "../store/reducers";

const TestTodo = () => {
  const initialTodoState = [
    { id: 123, day: "Senin", name: "Beli buku", isCompleted: false },
  ];

  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodoState);
  return (
    <TodoContext.Provider value={{ todos, dispatchTodos }}>
      <TodoList />
    </TodoContext.Provider>
  );
};

afterEach(cleanup);

describe("TodoList Component test", () => {
  it("Renders Todo List Correctly", () => {
    const { getByText } = render(<TestTodo />);

    expect(getByText(/Beli buku/i)).toBeInTheDocument();
    expect(getByText(/Senin/i)).toBeInTheDocument();
  });

  it("checklist todo works correctly", () => {
    const { getByTestId } = render(<TestTodo />);

    const todoElement = getByTestId("checkbox").querySelector(
      'input[type="checkbox"]'
    );
    fireEvent.click(todoElement, {
      target: { checked: true },
    });
    expect(todoElement).toHaveProperty("checked", true);
  });

  it("delete todo works correctly", () => {
    const { getByTestId, queryByText } = render(<TestTodo />);

    const deleteBtnElement = getByTestId("delete-button");
    fireEvent.click(deleteBtnElement);
    expect(queryByText(/Beli buku/i)).not.toBeInTheDocument();
  });
});
