const tasklist = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const taskPriority = document.getElementById("taskPriority");

// --- PROGRESS BAR ELEMENTS ---
const progressText = document.getElementById('progress-text');
const progressPercent = document.getElementById('progress-percent');
const progressFill = document.getElementById('progress-fill');

// Controle dos filtros ativos
let activeStatusFilter = "all";
let activePriorityFilter = "all";

function addTask() {
    const taskText = taskInput.value.trim();
    const priority = taskPriority.value;
    if (taskText !== "") {
        const maxText = taskText.substring(0, 35);

        const li = document.createElement("li");
        li.setAttribute("data-status", "pending");
        li.setAttribute("data-priority", priority);

        // Aplica cor conforme prioridade
        li.style.borderLeft = getPriorityColor(priority);

        li.innerHTML = `
            <span>${maxText}</span>
            <button class="completeButton" onClick="toggleComplete(this)">Concluir</button>
            <button class="editButton" onClick="editTask(this)">Editar</button>
            <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
        `;
        tasklist.appendChild(li);
        taskInput.value = "";
        updateProgress(); // <-- Atualiza a barra após adicionar
    }
}

function getPriorityColor(priority) {
    switch (priority) {
        case "alta":
            return "4px solid red";
        case "media":
            return "4px solid orange";
        case "baixa":
            return "4px solid green";
        default:
            return "4px solid transparent";
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
    applyFilters(); // reaplica o filtro após mudar status
    updateProgress(); // <-- Atualiza a barra após concluir
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
    updateProgress(); // <-- Atualiza a barra após remover
}

// ---- FILTROS ----
function filterTasks(filter) {
    if (filter === "all") {
        activeStatusFilter = "all";
        activePriorityFilter = "all"; // <-- resetar prioridade também
    } else if (["done", "pending"].includes(filter)) {
        activeStatusFilter = filter;
    } else if (["alta", "media", "baixa"].includes(filter)) {
        activePriorityFilter = filter;
    }
    applyFilters();
}

function applyFilters() {
    const tasks = tasklist.querySelectorAll("li");

    tasks.forEach(task => {
        const status = task.getAttribute("data-status");
        const priority = task.getAttribute("data-priority");

        const matchStatus =
            activeStatusFilter === "all" || status === activeStatusFilter;
        const matchPriority =
            activePriorityFilter === "all" || priority === activePriorityFilter;

        task.style.display = matchStatus && matchPriority ? "flex" : "none";
    });
    updateProgress(); // <-- Atualiza a barra após aplicar filtros
}

// --- FUNÇÃO DA PROGRESS BAR ---
function updateProgress() {
    const tasks = tasklist.querySelectorAll("li");
    const total = tasks.length;
    const done = Array.from(tasks).filter(li => li.getAttribute("data-status") === "done").length;

    const percent = total ? Math.round((done / total) * 100) : 0;

    if (progressText) progressText.textContent = `${done} de ${total} concluídas`;
    if (progressPercent) progressPercent.textContent = `${percent}%`;
    if (progressFill) progressFill.style.width = `${percent}%`;
}
