$(document).ready(function () {
    // Função para salvar as tarefas no LocalStorage
    function saveTasks(key, tasks) {
        localStorage.setItem(key, JSON.stringify(tasks));
    }

    // Função para carregar as tarefas do LocalStorage
    function loadTasks(key) {
        const tasks = localStorage.getItem(key);
        return tasks ? JSON.parse(tasks) : [];
    }

    // Função para renderizar as tarefas na tela
    function renderTasks(containerId, storageKey) {
        const tasks = loadTasks(storageKey);
        $(containerId).empty();
        tasks.forEach((task, index) => {
            const taskHtml = `
                <div class="task" data-index="${index}">
                    <input type="checkbox" class="progress" ${task.completed ? 'checked' : ''}>
                    <p class="task-description ${task.completed ? 'done' : ''}">${task.description}</p>
                    <div class="task-actions">
                        <a href="#" class="action-button edit-button">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                        <a href="#" class="action-button delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </a>
                    </div>
                    <form action="" class="to-do-form edit-task hidden">
                        <input type="text" class="edit-input" value="${task.description}">
                        <button type="submit" class="form-button confirm-button">
                            <i class="fa-solid fa-check"></i>
                        </button>
                    </form>
                </div>`;
            $(containerId).append(taskHtml);
        });
    }

    // Função genérica para adicionar tarefa
    function addTask(formSelector, inputSelector, containerId, storageKey) {
        $(document).on('submit', formSelector, function (e) {
            e.preventDefault();
            const taskDescription = $(inputSelector).val();
            if (taskDescription.trim() === "") return;
            const tasks = loadTasks(storageKey);
            tasks.push({ description: taskDescription, completed: false });
            saveTasks(storageKey, tasks);
            renderTasks(containerId, storageKey);
            $(inputSelector).val(''); // Limpar o campo de entrada
        });
    }

    // Adicionando tarefas para cada lista
    addTask('.to-do-form', '#task-input', '#tasks', 'tasks'); // Tarefas Importantes Hoje
    addTask('.to-do-forms', '#task-inputt', '#tasks_5', 'tasks_5'); // Tarefas em 5 Minutos
    addTask('.to-do-forme', '#task-inputa', '#tasks_s', 'tasks_s'); // Tarefas Importantes Semanais
    addTask('.to-do-forma', '#task-inpute', '#tasks_h', 'tasks_h'); // Hábitos Semanais

    // Marcar tarefa como concluída
    $(document).on('click', '.progress', function () {
        const index = $(this).closest('.task').data('index');
        const containerId = $(this).closest('#tasks, #tasks_5, #tasks_s, #tasks_h').attr('id');
        const tasks = loadTasks(containerId);
        tasks[index].completed = $(this).is(':checked');
        saveTasks(containerId, tasks);
        renderTasks(`#${containerId}`, containerId);
    });

    // Editar tarefa
    $(document).on('click', '.edit-button', function (e) {
        e.preventDefault(); // Evitar que o link navegue para o topo da página
        const task = $(this).closest('.task');
        task.find('.progress, .task-description, .task-actions').addClass('hidden');
        task.find('.edit-task').removeClass('hidden');
    });

    // Confirmar a edição da tarefa
    $(document).on('submit', '.edit-task', function (e) {
        e.preventDefault();
        const index = $(this).closest('.task').data('index');
        const newDescription = $(this).find('.edit-input').val();
        const containerId = $(this).closest('#tasks, #tasks_5, #tasks_s, #tasks_h').attr('id');
        const tasks = loadTasks(containerId);
        tasks[index].description = newDescription;
        saveTasks(containerId, tasks);
        renderTasks(`#${containerId}`, containerId);
    });

    // Excluir tarefa
    $(document).on('click', '.delete-button', function (e) {
        e.preventDefault();  // Evitar que o link navegue para o topo da página
        const index = $(this).closest('.task').data('index');
        const containerId = $(this).closest('#tasks, #tasks_5, #tasks_s, #tasks_h').attr('id');
        const tasks = loadTasks(containerId);
        tasks.splice(index, 1);
        saveTasks(containerId, tasks);
        renderTasks(`#${containerId}`, containerId);
    });

    // Carregar as tarefas salvas ao carregar a página
    renderTasks('#tasks', 'tasks');
    renderTasks('#tasks_5', 'tasks_5');
    renderTasks('#tasks_s', 'tasks_s');
    renderTasks('#tasks_h', 'tasks_h');
});



////////////

$(document).ready(function () {
    function saveTasks(key, tasks) {
        localStorage.setItem(key, JSON.stringify(tasks));
    }

    function loadTasks(key) {
        const tasks = localStorage.getItem(key);
        return tasks ? JSON.parse(tasks) : [];
    }

    function renderTasks(containerId, storageKey) {
        const tasks = loadTasks(storageKey);
        $(containerId).empty();
        tasks.forEach((task, index) => {
            const taskHtml = `
                <div class="task" data-index="${index}">
                    <input type="checkbox" class="progress" ${task.completed ? 'checked' : ''}>
                    <p class="task-description ${task.completed ? 'done' : ''}">${task.description}</p>
                    <div class="task-actions">
                        <a href="#" class="action-button delete-button">
                            <i class="fa-solid fa-trash-can"></i>
                        </a>
                    </div>
                </div>`;
            $(containerId).append(taskHtml);
        });
    }

    function addTask(formSelector, inputSelector, containerId, storageKey) {
        $(document).on('submit', formSelector, function (e) {
            e.preventDefault();
            const taskDescription = $(inputSelector).val();
            if (taskDescription.trim() === "") return;
            const tasks = loadTasks(storageKey);
            tasks.push({ description: taskDescription, completed: false });
            saveTasks(storageKey, tasks);
            renderTasks(containerId, storageKey);
            $(inputSelector).val('');
        });
    }

    // Adicionando tarefas para cada dia da semana
    addTask('#form-domingo', '#task-input-domingo', '#tasks-domingo', 'tasks-domingo');
    addTask('#form-segunda', '#task-input-segunda', '#tasks-segunda', 'tasks-segunda');
    addTask('#form-terca', '#task-input-terca', '#tasks-terca', 'tasks-terca');
    addTask('#form-quarta', '#task-input-quarta', '#tasks-quarta', 'tasks-quarta');
    addTask('#form-quinta', '#task-input-quinta', '#tasks-quinta', 'tasks-quinta');
    addTask('#form-sexta', '#task-input-sexta', '#tasks-sexta', 'tasks-sexta');
    addTask('#form-sabado', '#task-input-sabado', '#tasks-sabado');

    // Marcar tarefa como concluída
    $(document).on('click', '.progress', function () {
        const index = $(this).closest('.task').data('index');
        const containerId = $(this).closest('#tasks-domingo, #tasks-segunda, #tasks-terca, #tasks-quarta, #tasks-quinta, #tasks-sexta, #tasks-sabado').attr('id');
        const tasks = loadTasks(containerId);
        tasks[index].completed = $(this).is(':checked');
        saveTasks(containerId, tasks);
        renderTasks(`#${containerId}`, containerId);
    });

    // Excluir tarefa
    $(document).on('click', '.delete-button', function (e) {
        e.preventDefault();
        const index = $(this).closest('.task').data('index');
        const containerId = $(this).closest('#tasks-domingo, #tasks-segunda, #tasks-terca, #tasks-quarta, #tasks-quinta, #tasks-sexta, #tasks-sabado').attr('id');
        const tasks = loadTasks(containerId);
        tasks.splice(index, 1);
        saveTasks(containerId, tasks);
        renderTasks(`#${containerId}`, containerId);
    });

    // Carregar as tarefas salvas ao carregar a página
    renderTasks('#tasks-domingo', 'tasks-domingo');
    renderTasks('#tasks-segunda', 'tasks-segunda');
    renderTasks('#tasks-terca', 'tasks-terca');
    renderTasks('#tasks-quarta', 'tasks-quarta');
    renderTasks('#tasks-quinta', 'tasks-quinta');
    renderTasks('#tasks-sexta', 'tasks-sexta');
    renderTasks('#tasks-sabado', 'tasks-sabado');
});
