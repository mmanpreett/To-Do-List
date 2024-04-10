const addBtn = document.querySelector(".add");
const taskField = document.querySelector(".taskInput");
const list = document.querySelector(".list");
let tasks = []; // Array to store tasks

document.addEventListener("DOMContentLoaded", () => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    renderTasks(); // Render saved tasks on page load
});

addBtn.addEventListener("click", addTask);

function addTask() {
    if (taskField.value.length === 0) {
        return;
    } else {
        const taskText = taskField.value.trim();
        tasks.push(taskText); // Add new task to tasks array
        saveTasksToLocalStorage(); // Save tasks to localStorage
        renderTasks(); // Render tasks on the page
        taskField.value = "";
    }
}

function renderTasks() {
    // Clear the existing task list
    list.innerHTML = "";
    
    // Render each task in the tasks array
    tasks.forEach((taskText, index) => {
        const taskContainer = document.createElement("div");
        taskContainer.className = "taskContainer";
        
        const task = document.createElement("p");
        task.className = "task";
        task.textContent = taskText;
        if (taskText.startsWith("✓ ")) {
            task.style.textDecoration = "line-through"; // Apply strike-through style
        }
        
        const doneBtn = document.createElement("i");
        doneBtn.className = "fas fa-check";
        doneBtn.addEventListener("click", () => checkTask(index));
        
        const deleteBtn = document.createElement("i");
        deleteBtn.className = "fas fa-trash-alt";
        deleteBtn.addEventListener("click", () => deleteTask(index));
        
        taskContainer.appendChild(task);
        taskContainer.appendChild(doneBtn);
        taskContainer.appendChild(deleteBtn);
        
        list.appendChild(taskContainer);
    });
}

function checkTask(index) {
    // Toggle task completion
    tasks[index] = tasks[index].startsWith("✓ ") ? tasks[index].slice(2) : "✓ " + tasks[index];
    saveTasksToLocalStorage(); // Update tasks in localStorage
    renderTasks(); // Re-render tasks
}

function deleteTask(index) {
    tasks.splice(index, 1); // Remove task from tasks array
    saveTasksToLocalStorage(); // Update tasks in localStorage
    renderTasks(); // Re-render tasks
}

function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
