import React, { useState, useEffect } from "react";

import "./TaskManager.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskTitle.trim() === "") return;
    const newTask = { title: taskTitle, todos: [], newTodo: "", isEditing: false };
    setTasks([...tasks, newTask]);
    setTaskTitle("");
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const addTodo = (index) => {
    if (tasks[index].newTodo.trim() === "") return;
    const updatedTasks = [...tasks];
    updatedTasks[index].todos.push({ text: updatedTasks[index].newTodo, completed: false, isEditing: false });
    updatedTasks[index].newTodo = "";
    setTasks(updatedTasks);
  };

  const toggleTodo = (taskIndex, todoIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].todos[todoIndex].completed = !updatedTasks[taskIndex].todos[todoIndex].completed;
    setTasks(updatedTasks);
  };

  const deleteTodo = (taskIndex, todoIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].todos.splice(todoIndex, 1);
    setTasks(updatedTasks);
  };

  const updateNewTodo = (index, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].newTodo = value;
    setTasks(updatedTasks);
  };

  const toggleTaskEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isEditing = !updatedTasks[index].isEditing;
    setTasks(updatedTasks);
  };

  const updateTaskTitle = (index, newTitle) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].title = newTitle;
    setTasks(updatedTasks);
  };

  const toggleTodoEdit = (taskIndex, todoIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].todos[todoIndex].isEditing = !updatedTasks[taskIndex].todos[todoIndex].isEditing;
    setTasks(updatedTasks);
  };

  const updateTodoText = (taskIndex, todoIndex, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].todos[todoIndex].text = newText;
    setTasks(updatedTasks);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center title">Task Manager</h2>

      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter Task Title"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <button className="btn btn-primary" onClick={addTask}>Add Task</button>
      </div>

      <div className="task-container">
        {tasks.map((task, index) => (
          <div key={index} className="task-card">
            <div className="task-header">
              {task.isEditing ? (
                <input
                  type="text"
                  className="form-control"
                  value={task.title}
                  onChange={(e) => updateTaskTitle(index, e.target.value)}
                  onBlur={() => toggleTaskEdit(index)}
                  autoFocus
                />
              ) : (
                <h5 onClick={() => toggleTaskEdit(index)}>{task.title}</h5>
              )}
              <button className="btn btn-danger btn-sm" onClick={() => deleteTask(index)}>❌</button>
            </div>

            <ul className="todo-list">
              {task.todos.map((todo, todoIndex) => (
                <li key={todoIndex} className={`todo-item ${todo.completed ? "completed" : ""}`}>
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={todo.completed}
                    onChange={() => toggleTodo(index, todoIndex)}
                  />
                  {todo.isEditing ? (
                    <input
                      type="text"
                      className="form-control"
                      value={todo.text}
                      onChange={(e) => updateTodoText(index, todoIndex, e.target.value)}
                      onBlur={() => toggleTodoEdit(index, todoIndex)}
                      autoFocus
                    />
                  ) : (
                    <span onClick={() => toggleTodoEdit(index, todoIndex)}>{todo.text}</span>
                  )}
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => deleteTodo(index, todoIndex)}>❌</button>
                </li>
              ))}
            </ul>

            <div className="input-group mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Add Todo"
                value={task.newTodo}
                onChange={(e) => updateNewTodo(index, e.target.value)}
              />
              <button className="btn btn-warning" onClick={() => addTodo(index)}>Add Todo</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
