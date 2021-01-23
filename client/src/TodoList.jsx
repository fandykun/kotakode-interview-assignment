import React from "react";

export default function TodoList(props) {
  const tasks = props.tasks;

  return (
    <div>
      {tasks.map((task) => (
        <li>
          {task}
          <button onClick={() => props.handleRemove(task)}>Hapus</button>
        </li>
      ))}
    </div>
  );
}
