// Referências aos elementos da UI
const tasklist = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const taskPriority = document.getElementById("taskPriority");

// --- Elementos da barra de progresso ---
const progressText = document.getElementById('progress-text');
const progressPercent = document.getElementById('progress-percent');
const progressFill = document.getElementById('progress-fill');

// Estado atual dos filtros aplicados
let activeStatusFilter = "all";
let activePriorityFilter = "all";

// Cria uma nova tarefa e adiciona na lista
function addTask() {
    // Lê o texto e a prioridade escolhida
    const taskText = taskInput.value.trim();
    const priority = taskPriority.value;

    // Só cria se tiver conteúdo
    if (taskText !== "") {
        // Limita visualmente o texto a 35 caracteres (sem cortar a lógica)
        const maxText = taskText.substring(0, 35);

        // Cria o item de lista com metadados de status e prioridade
        const li = document.createElement("li");
        li.setAttribute("data-status", "pending");   // estado inicial: pendente
        li.setAttribute("data-priority", priority);  // prioridade selecionada

        // Aplica uma borda colorida com base na prioridade
        li.style.borderLeft = getPriorityColor(priority);

        // Estrutura do item (texto + botões de ação)
        // Observação: handlers inline funcionam, mas você pode migrar para addEventListener para separar JS do HTML
        li.innerHTML = `
            <span>${maxText}</span>
            <button class="completeButton" onClick="toggleComplete(this)">Concluir</button>
            <button class="editButton" onClick="editTask(this)">Editar</button>
            <button class="deleteButton" onClick="deleteTask(this)">Remover</button>
        `;

        // Insere na lista e limpa campo
        tasklist.appendChild(li);
        taskInput.value = "";

        // Recalcula progresso após adicionar
        updateProgress();
    }
}

// Retorna a borda (largura + cor) conforme a prioridade
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

// Alterna o status de concluída/pendente do item clicado
function toggleComplete(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");

    if (li.getAttribute("data-status") === "pending") {
        // Marca como concluída
        li.setAttribute("data-status", "done");
        span.style.textDecoration = "line-through";
        button.textContent = "Reabrir";
    } else {
        // Volta para pendente
        li.setAttribute("data-status", "pending");
        span.style.textDecoration = "none";
        button.textContent = "Concluir";
    }

    // Reaplica filtros para refletir o novo status e atualiza progresso
    applyFilters();
    updateProgress();
}

// Edita o texto da tarefa via prompt
function editTask(button) {
    const li = button.parentElement;
    const span = li.querySelector("span");

    // Abre prompt com o texto atual e aplica se o usuário confirmou e não deixou vazio
    const newText = prompt("Editar tarefa:", span.textContent);
    if (newText !== null && newText.trim() !== "") {
        span.textContent = newText.trim();
    }
}

// Remove a tarefa da lista
function deleteTask(button) {
    const li = button.parentElement;
    tasklist.removeChild(li);

    // Atualiza o progresso após remover
    updateProgress();
}

// ---- FILTROS ----

// Atualiza o estado de filtros conforme a opção escolhida no menu lateral
function filterTasks(filter) {
    if (filter === "all") {
        // "Todas Tarefas" limpa filtro de status e prioridade
        activeStatusFilter = "all";
        activePriorityFilter = "all";
    } else if (["done", "pending"].includes(filter)) {
        // Filtro por status
        activeStatusFilter = filter;
    } else if (["alta", "media", "baixa"].includes(filter)) {
        // Filtro por prioridade
        activePriorityFilter = filter;
    }

    // Aplica o que ficou definido
    applyFilters();
}

// Percorre as tarefas e mostra/oculta conforme os filtros ativos
function applyFilters() {
    const tasks = tasklist.querySelectorAll("li");

    tasks.forEach(task => {
        const status = task.getAttribute("data-status");
        const priority = task.getAttribute("data-priority");

        // Verifica se cada tarefa corresponde aos filtros atuais
        const matchStatus =
            activeStatusFilter === "all" || status === activeStatusFilter;
        const matchPriority =
            activePriorityFilter === "all" || priority === activePriorityFilter;

        // Exibe apenas se atender aos dois filtros
        task.style.display = matchStatus && matchPriority ? "flex" : "none";
    });

    // Mesmo filtrando, o progresso considera totais/feitas do que está renderizado
    updateProgress();
}

// --- Barra de progresso ---

// Calcula e atualiza os elementos visuais do progresso
function updateProgress() {
    // Considera apenas os <li> atualmente visíveis (após filtros)
    const tasks = tasklist.querySelectorAll("li");
    const visibleTasks = Array.from(tasks).filter(li => li.style.display !== "none");

    const total = visibleTasks.length; // total visível
    const done = visibleTasks.filter(li => li.getAttribute("data-status") === "done").length;

    // Evita divisão por zero: se total=0 -> 0%
    const percent = total ? Math.round((done / total) * 100) : 0;

    // Atualiza textos e largura do preenchimento da barra
    if (progressText) progressText.textContent = `${done} de ${total} concluídas`;
    if (progressPercent) progressPercent.textContent = `${percent}%`;
    if (progressFill) progressFill.style.width = `${percent}%`;
}