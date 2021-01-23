import React, { useState } from "react";
import "./App.css";
import TodoList from "./TodoList";

function App() {
  const [tasks, setTasks] = useState(["Cuci Baju", "Masak Nasi"]);

  const [input, setInput] = useState("");

  const handleInputTask = (event) => {
    setInput(event.target.value);
  };

  const handleTambahTask = () => {
    if (input !== "") setTasks(tasks.concat(input));
    setInput("");
  };

  const handleHapusTask = (name) => {
    setTasks(tasks.filter((task) => task !== name));
  };

  return (
    <div className="App">
      <h1>Pekerjaan Rumah Yang Perlu Dilakukan</h1>
      <input value={input} onChange={(event) => handleInputTask(event)} />
      <button onClick={handleTambahTask}>Tambah</button>
      <TodoList tasks={tasks} handleRemove={handleHapusTask} />
    </div>
  );
}

export default App;
