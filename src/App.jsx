import "./App.css";
import { useState } from "react";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";
import { useEffect } from "react";

export default function App() {
  const [todos, setToDos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setToDos((currentToDos) => {
      return [
        ...currentToDos,
        {
          id: crypto.randomUUID(),
          title,
          completed: false,
        },
      ];
    });
    console.log(todos);
  }

  function toggleTodo(id, completed) {
    setToDos((currentToDos) => {
      return currentToDos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setToDos((currentToDos) => {
      return currentToDos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
