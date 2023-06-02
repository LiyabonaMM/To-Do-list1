//Using the DOM method

const newTaskInput = document.getElementById('newTaskInput');
const addTaskButton = document.getElementById('addTaskButton');
const sortButton = document.getElementById('sortButton');
const taskList = document.getElementById('tasks');

// Retrieving tasks from localStorage or initialize an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render the tasks in the task list
function renderTasks() {
 
  // Clear the task list
  taskList.innerHTML = '';

  // Looping through the tasks array
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];



    // Creating a new list item for each task
    const listItem = document.createElement('li');

    // Creating a checkbox for the task
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed; // Set checkbox state based on task completion
    checkbox.addEventListener('change', function () {
      
      
      // Toggling the completed state of the task
      
      task.completed = !task.completed;
      saveTasks(); // Saving  the tasks to localStorage
      renderTasks(); // Re-render the tasks to update the UI (User Interacting)
    });

    
    // Creating a span element for the task name
    const taskName = document.createElement('span');
    taskName.innerText = task.name;

    // Adding the necessary classes based on the completed state
    if (task.completed) {
      listItem.classList.add('completed');
    }

    // Creating a button to remove the task
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-btn');
    closeButton.innerHTML = '&times;';
    closeButton.addEventListener('click', function () {
      
      // Removing  the task from the array
      tasks.splice(i, 1);
      saveTasks(); // Saving  the tasks to localStorage
      renderTasks(); // Re-render the tasks to update the UI
    });

    // Append the elements to the list item
    listItem.appendChild(checkbox);
    listItem.appendChild(taskName);
    listItem.appendChild(closeButton);

    // Append the list item to the task list
    taskList.appendChild(listItem);
  }
}

// Function to add a new task
function addTask() {
  const taskName = newTaskInput.value.trim();

  // Validate the task name
  if (taskName === '' || taskName.length < 4) {
    alert('Please enter a valid task name (at least 4 characters).');
    return;
  }

  // Creating a new task object
  const newTask = {
    id: tasks.length + 1,
    name: taskName,
    createdDate: new Date(),
    completed: false
  };

  // Adding  the new task to the tasks array
  tasks.push(newTask);

  // Clear the input field
  newTaskInput.value = '';

  saveTasks(); // Save the tasks to localStorage
  renderTasks(); // Render the tasks to update the UI
}

// Function to sort the tasks alphabetically
function sortTasks() {
  tasks.sort((a, b) => a.name.localeCompare(b.name));
  renderTasks(); // Render the sorted tasks
}

// Event listener for the add task button
addTaskButton.addEventListener('click', addTask);

// Event listener for the sort button
sortButton.addEventListener('click', sortTasks);

// Render the initial tasks
renderTasks();
