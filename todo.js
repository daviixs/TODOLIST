const tasklist = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const maxText = taskText.substring(0, 35);

        const li = document.createElement("li");
        li.setAttribute("data-status", "pending"); // começa como pendente

        li.innerHTML = `
            <span>${maxText}</span>
            <button class="completeButton" onClick="toggleComplete(this)">Concluir</button>
            <button class="editButton" onClick="editTask(this)">Editar</button>
            <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
        `;
        tasklist.appendChild(li);
        taskInput.value = "";
    }
}

function toggleComplete(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");

    if (li.getAttribute("data-status") === "pending") {
        li.setAttribute("data-status", "done");
        span.style.textDecoration = "line-through";
        button.textContent = "Reabrir";
    } else {
        li.setAttribute("data-status", "pending");
        span.style.textDecoration = "none";
        button.textContent = "Concluir";
    }
}

function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");
    const newText = prompt("Editar tarefa:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
    }
}

function deleteTask(button) {
    const li = button.parentElement;
    tasklist.removeChild(li);
}

// ---- FILTROS ----
function filterTasks(filter) {
    const tasks = tasklist.querySelectorAll("li");

    tasks.forEach(task => {
        const status = task.getAttribute("data-status");

        if (filter === "all") {
            task.style.display = "flex";
        } else if (filter === "done" && status === "done") {
            task.style.display = "flex";
        } else if (filter === "pending" && status === "pending") {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}
