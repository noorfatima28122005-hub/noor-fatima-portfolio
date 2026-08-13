document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       GET HTML ELEMENTS
    ========================================= */

    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const tasksList = document.getElementById("tasksList");
    const taskCount = document.getElementById("taskCount");
    const clearCompleted = document.getElementById("clearCompleted");


    /* =========================================
       LOAD TASKS
    ========================================= */

    let tasks = [];

    try {
        tasks = JSON.parse(
            localStorage.getItem("noorTasks")
        ) || [];
    } catch (error) {
        tasks = [];
    }


    /* =========================================
       SAVE TASKS
    ========================================= */

    function saveTasks() {

        localStorage.setItem(
            "noorTasks",
            JSON.stringify(tasks)
        );

    }


    /* =========================================
       UPDATE TASK COUNT
    ========================================= */

    function updateTaskCount() {

        const remainingTasks = tasks.filter(function (task) {
            return !task.completed;
        }).length;


        if (remainingTasks === 1) {

            taskCount.textContent = "1 Task";

        } else {

            taskCount.textContent =
                remainingTasks + " Tasks";

        }

    }


    /* =========================================
       SHOW EMPTY STATE
    ========================================= */

    function showEmptyState() {

        tasksList.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ✓
                </div>

                <h2>
                    No tasks yet
                </h2>

                <p>
                    Add your first task and start being productive.
                </p>

            </div>
        `;

    }


    /* =========================================
       DISPLAY TASKS
    ========================================= */

    function renderTasks() {

        tasksList.innerHTML = "";


        if (tasks.length === 0) {

            showEmptyState();

            updateTaskCount();

            return;
        }


        tasks.forEach(function (task) {

            const taskElement =
                document.createElement("div");

            taskElement.className = "task";


            if (task.completed) {

                taskElement.classList.add(
                    "completed"
                );

            }


            /* CHECK BUTTON */

            const checkButton =
                document.createElement("button");

            checkButton.className =
                "check-btn";

            checkButton.type = "button";

            checkButton.textContent = "✓";


            checkButton.addEventListener(
                "click",
                function () {

                    toggleTask(task.id);

                }
            );


            /* TASK TEXT */

            const taskText =
                document.createElement("span");

            taskText.className =
                "task-text";

            taskText.textContent =
                task.text;


            /* DELETE BUTTON */

            const deleteButton =
                document.createElement("button");

            deleteButton.className =
                "delete-btn";

            deleteButton.type = "button";

            deleteButton.textContent = "×";


            deleteButton.addEventListener(
                "click",
                function () {

                    deleteTask(task.id);

                }
            );


            /* ADD ELEMENTS */

            taskElement.appendChild(
                checkButton
            );

            taskElement.appendChild(
                taskText
            );

            taskElement.appendChild(
                deleteButton
            );


            tasksList.appendChild(
                taskElement
            );

        });


        updateTaskCount();

    }


    /* =========================================
       ADD TASK
    ========================================= */

    function addTask() {

        const text =
            taskInput.value.trim();


        if (text === "") {

            taskInput.focus();

            return;

        }


        const newTask = {

            id: Date.now(),

            text: text,

            completed: false

        };


        tasks.unshift(newTask);


        saveTasks();

        renderTasks();


        taskInput.value = "";

        taskInput.focus();

    }


    /* =========================================
       COMPLETE TASK
    ========================================= */

    function toggleTask(id) {

        tasks = tasks.map(function (task) {

            if (task.id === id) {

                return {
                    id: task.id,
                    text: task.text,
                    completed: !task.completed
                };

            }

            return task;

        });


        saveTasks();

        renderTasks();

    }


    /* =========================================
       DELETE TASK
    ========================================= */

    function deleteTask(id) {

        tasks = tasks.filter(function (task) {

            return task.id !== id;

        });


        saveTasks();

        renderTasks();

    }


    /* =========================================
       CLEAR COMPLETED
    ========================================= */

    clearCompleted.addEventListener(
        "click",
        function () {

            tasks = tasks.filter(function (task) {

                return !task.completed;

            });


            saveTasks();

            renderTasks();

        }
    );


    /* =========================================
       ADD BUTTON
    ========================================= */

    addTaskBtn.addEventListener(
        "click",
        function () {

            addTask();

        }
    );


    /* =========================================
       ENTER KEY
    ========================================= */

    taskInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                addTask();

            }

        }
    );


    /* =========================================
       START APP
    ========================================= */

    renderTasks();

});