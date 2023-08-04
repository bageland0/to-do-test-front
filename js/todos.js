import { todoTemplate } from "./templates.js";
import { refreshTasks, postTask, findTasks, findByTagTasks, setTasks, assignTasks } from "./tasks.js";

async function getTodos() {
    return await $.ajax({
        type: "GET",
        url: API_LOCATION + "todos/",
        headers: {
            Authorization: `Bearer ${getCookie("auth_token")}`,
        },
        dataType: "json",
        encode: true,
        success: function (data) {
            return data;
        },
    });
}

async function postTodo() {
    return await $.ajax({
        type: "POST",
        url: API_LOCATION + "todos/",
        headers: {
            Authorization: `Bearer ${getCookie("auth_token")}`,
        },
        dataType: "json",
        data: {
            name: $("#inputCreateTodo").val(),
        },
        encode: true,
        success: function (data) {
            return data;
        },
    });
}

async function updateTodo(id) {
    return await $.ajax({
        type: "POST",
        url: API_LOCATION + `todos/${id}`,
        headers: {
            Authorization: `Bearer ${getCookie("auth_token")}`,
        },
        dataType: "json",
        data: {
            _method: "PATCH",
            name: $(`#${id}nameUpdateTodo`).val(),
        },
        encode: true,
        success: function (data) {
            return data;
        },
    });
}

async function deleteTodo(id) {
    return await $.ajax({
        type: "POST",
        url: API_LOCATION + `todos/${id}`,
        headers: {
            Authorization: `Bearer ${getCookie("auth_token")}`,
        },
        dataType: "json",
        data: {
            _method: "DELETE",
        },
        encode: true,
        success: function (data) {
            return data;
        },
    });
}

async function refreshTodos() {
    let formedTodos = ``;
    await getTodos()
        .then((todos) => {
            todos.data.forEach((todo) => {
                formedTodos += todoTemplate(todo);
            });
            $("#todos").html(formedTodos);
            return todos;
        })
        .then(async (todos) => {
            await Promise.all(
                todos.data.map(async (todo) => {
                    await refreshTasks(todo.id);

                    $(`#${todo.id}formUpdateTodo`).submit(function (event) {
                        console.log("update todo");
                        updateTodo(todo.id).then(async () => {
                            await refreshTodos();
                        });
                        event.preventDefault();
                    });
                    $(`#${todo.id}formDeleteTodo`).submit(function (event) {
                        console.log("update todo");
                        deleteTodo(todo.id).then(async () => {
                            await refreshTodos();
                        });
                        event.preventDefault();
                    });

                    $(`#${todo.id}formCreateTask`).submit(function (event) {
                        console.log("start task");
                        postTask(todo.id).then(async () => {
                            await refreshTasks(todo.id);
                        });
                        event.preventDefault();
                    });
                    $(`#${todo.id}formFindTask`).submit(function (event) {
                        console.log("find task");
                        findTasks(todo.id).then(async (tasks) => {
                            setTasks(tasks, todo.id).then(async (tasks) => {
                                console.log('fucke', tasks);
                                await assignTasks(tasks, todo.id)
                            });
                        });
                        event.preventDefault();
                    });
                    $(`#${todo.id}formFindByTagTask`).submit(function (event) {
                        console.log("find by tag task");
                        findByTagTasks(todo.id).then(async (tasks) => {
                            setTasks(tasks, todo.id).then(async (tasks) => {
                                await assignTasks(tasks, todo.id)
                            });
                        });
                        event.preventDefault();
                    });
                    $(`#${todo.id}resetTasks`).on('click', function () {
                        refreshTasks(todo.id);
                    });
                })
            );
        });
}

export { getTodos, postTodo, refreshTodos };
