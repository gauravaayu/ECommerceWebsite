import React from 'react';

function TaskList({ tasks, updateTaskStatus, deleteTask }) {
  return (
    <ul className="list-group mt-3">
      {tasks.map((task, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h5>{task.title}</h5>
            <p>{task.description}</p>
            <select className="form-select" value={task.status} onChange={(e) => updateTaskStatus(index, e.target.value)}>
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          <button className="btn btn-danger" onClick={() => deleteTask(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
