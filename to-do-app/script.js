// Declaring DOM elements
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// Initialize task data from localStorage or set to empty array
const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {}; // To store the task being edited

// Function to remove special characters from a string except spaces
const removeSpecialChars = val => {
    return val.trim().replace(/[^A-Za-z0-9\-\s]/g, "");
};

// Add or update a task in the taskData array
const addOrUpdateTask = () => {
    if (!titleInput.value.trim()) {
        alert("Please provide a title");
    return;
}

const dataArrIndex = taskData.findIndex(item => item.id === currentTask.id);

const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
};


if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
} else {
    taskData[dataArrIndex] = taskObj;
}

localStorage.setItem("data", JSON.stringify(taskData));
    updateTaskContainer();
    reset();
};

// Update the tasks display container
const updateTaskContainer = () => {
    tasksContainer.innerHTML = "";

    taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
    <div class="task" id="${id}">
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Description:</strong> ${description}</p>
        <button onclick="editTask(this)" type="button" class="btn">Edit</button>
        <button onclick="deleteTask(this)" type="button" class="btn">Delete</button>
    </div>
    `;
});
};

// Delete a task from the taskData array
const deleteTask = buttonEl => {
    const dataArrIndex = taskData.findIndex(
    item => item.id === buttonEl.parentElement.id
);

    buttonEl.parentElement.remove();
    taskData.splice(dataArrIndex, 1);
    localStorage.setItem("data", JSON.stringify(taskData));
};

// Edit a task by populating the form with its data
const editTask = buttonEl => {
    const dataArrIndex = taskData.findIndex(
    item => item.id === buttonEl.parentElement.id
);

    currentTask = taskData[dataArrIndex];

    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description;

    addOrUpdateTaskBtn.innerText = "Update Task";
    taskForm.classList.toggle("hidden");
};

// Reset the form and clear currentTask
const reset = () => {
    addOrUpdateTaskBtn.innerText = "Add Task";
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
    taskForm.classList.toggle("hidden");
    currentTask = {};
};

// Initial tasks display
if (taskData.length) {
    updateTaskContainer();
}

// Event listeners
openTaskFormBtn.addEventListener("click", () =>
    taskForm.classList.toggle("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
    const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;
    
    const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;

    if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
    } else {
    reset();
    }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
    confirmCloseDialog.close();
    reset();
});

taskForm.addEventListener("submit", e => {
    e.preventDefault();
    addOrUpdateTask();
});
