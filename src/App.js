import React, { useState } from 'react';
import { nanoid } from "nanoid";
import Todo from './components/Todo';
import Form from './components/Form';
import TopNav from './components/TopNav';

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed,
  Important: task => task.important
}

function App(props) {  
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');
  const [lists, setLists] = useState([]);

  function addList(list) {
    setLists([...lists, list]);
  }

  function removeList(id) {
    const tempLists = lists.slice();
    const index = tempLists.findIndex(list => list.id === id);
    tempLists.slice(index, 1);
    setLists(tempLists);
  }

  function addTask(name) {
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false, important: false};
    setTasks([...tasks, newTask]);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if(id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  function toggleTaskImportant(id) {
    const updatedTasks = tasks.map(task => {
      if(id === task.id) {
        return {...task, important: !task.important}
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  function deleteTask(id) {
    let confirmed = window.confirm("Are you sure you want to delete this task?")
    if(confirmed) {
      const remainingTasks = tasks.filter(task => id !== task.id);
      setTasks(remainingTasks);
    }
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if(id === task.id) {
        return {...task, name: newName}
      }
      return task;
    })
    setTasks(editedTaskList);
    localStorage.setItem('tasks', JSON.stringify(editedTaskList));
  }

  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
      <Todo 
        id={task.id} 
        name={task.name} 
        completed={task.completed} 
        important={task.important}
        key={task.id} 
        toggleTaskCompleted={toggleTaskCompleted}
        toggleTaskImportant={toggleTaskImportant}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    )
  );

  const projectList = projects.filter(PROJECT_MAP[])

  localStorage.setItem('tasks', JSON.stringify(tasks));

  const filterList = FILTER_NAMES.map(name => (
    <TopNav 
      key={name} 
      name={name} 
      isPressed={name === filter} 
      setFilter={setFilter} 
    />
  ))

  const projectList = PROJECT_NAMES.map(name => (
    <ProjectList
      key={name}
      name={name}
      isPressed = {name === project}
      setFilter={setFilter}
    />
  ))
  
  const tasksNoun = taskList.length === 1 ? "task" : "tasks";
  const headingText = `${taskList.length} ${tasksNoun}`;

  return (
    <div className="todo-list-app">
      <nav>
        <div>
          <h1>Todo List App</h1>
          <ul className="top-nav">
            {filterList}
          </ul>
          <ul className="bottom-nav">
            {ProjectList}
          </ul>
        </div>
        <button className="add-project">Add Project</button>
      </nav>
      <main>
        <header>
          <h2 className="project-title">Tasks <span>({headingText})</span></h2>

          <div className="task-input-container">
            <Form addTask={addTask} />
          </div>
        </header>
        <ul className="task-list">
          {taskList}
        </ul>
      </main>
    </div>
    )
}

export default App;
