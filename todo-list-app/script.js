const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const tasksList = document.getElementById("tasksList");
const taskCount = document.getElementById("taskCount");
const clearCompleted = document.getElementById("clearCompleted");

let tasks = [];

function updateTaskCount() {
    const activeTasks = tasks.filter(task => !task.completed).length;

    taskCount.textContent =
        `${activeTasks} ${activeTasks === 1 ? "Task" : "Tasks"}`;
}

function renderTasks() {
    tasksList.innerHTML = "";

    if (tasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">✓</div>
                <h2>No tasks yet</h2>
                <p>Add your first task and start being productive.</p>
            </div>
        `;

        updateTaskCount();
        return;
    }

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");

        taskElement.className =
            `task ${task.completed ? "completed" : ""}`;

        taskElement.innerHTML = `
            <button class="check-btn" aria-label="Complete task">
                ✓
            </button>

            <span class="task-text"></span>

            <button class="delete-btn" aria-label="Delete task">
                ×
            </button>
        `;

        taskElement.querySelector(".task-text").textContent = task.text;

        taskElement
            .querySelector(".check-btn")
            .addEventListener("click", () => {
                tasks[index].completed = !tasks[index].completed;
                renderTasks();
            });

        taskElement
            .querySelector(".delete-btn")
            .addEventListener("click", () => {
                tasks.splice(index, 1);
                renderTasks();
            });

        tasksList.appendChild(taskElement);
    });

    updateTaskCount();
}

function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        taskInput.focus();
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    taskInput.value = "";

    renderTasks();

    taskInput.focus();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

clearCompleted.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
});

renderTasks();
