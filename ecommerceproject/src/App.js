import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect,useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:9000/api/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTaskStatus = async (index, status) => {
    try {
      const task = tasks[index];
      const response = await axios.put(`http://localhost:9000/api/tasks/${task._id}`, { ...task, status });
      const newTasks = [...tasks];
      newTasks[index] = response.data;
      setTasks(newTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (index) => {
    try {
      const task = tasks[index];
      await axios.delete(`http://localhost:9000/api/tasks/${task._id}`);
      setTasks(tasks.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => filter === 'All' || task.status === filter);

 

  return (
    <div className="container mt-4">
      <h1 className="text-center">Task Manager</h1>
      <TaskForm addTask={addTask} />
      <div className="mt-3">
        <label>Filter by status: </label>
        <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>
      <TaskList tasks={filteredTasks} updateTaskStatus={updateTaskStatus} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
