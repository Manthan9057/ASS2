// Task Management System
document.addEventListener('DOMContentLoaded', () => {
    const taskList = document.getElementById('task-list');
    const taskForm = document.getElementById('task-form');
  
    // Initialize tasks
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Display tasks
    function displayTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task');
        taskItem.innerHTML = `
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <span class="status">${task.status}</span>
          <div class="actions">
            <button class="edit" data-index="${index}">Edit</button>
            <button class="delete" data-index="${index}">Delete</button>
          </div>
        `;
        taskList.appendChild(taskItem);
      });
    }
  
    // Add new task
    function addTask(event) {
      event.preventDefault();
      const titleInput = document.getElementById('task-title');
      const descriptionInput = document.getElementById('task-description');
      const statusSelect = document.getElementById('task-status');
      const title = titleInput.value;
      const description = descriptionInput.value;
      const status = statusSelect.value;
      const task = { title, description, status };
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      displayTasks();
      taskForm.reset();
    }
  
    // Edit task
    function editTask(event) {
      if (event.target.classList.contains('edit')) {
        const index = event.target.getAttribute('data-index');
        const task = tasks[index];
        const titleInput = document.getElementById('task-title');
        const descriptionInput = document.getElementById('task-description');
        const statusSelect = document.getElementById('task-status');
        titleInput.value = task.title;
        descriptionInput.value = task.description;
        statusSelect.value = task.status;
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
      }
    }
  
    // Delete task
    function deleteTask(event) {
      if (event.target.classList.contains('delete')) {
        const index = event.target.getAttribute('data-index');
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
      }
    }
  
    // Event listeners
    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', editTask);
    taskList.addEventListener('click', deleteTask);
  
    // Initial display
    displayTasks();
  });
  