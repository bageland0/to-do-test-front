import { taskTemplate } from "./templates.js";
import { refreshTags, postTag } from "./tags.js";

async function getTasks(todo_id) {
    return await $.ajax({
        type: "GET",
        url: API_LOCATION + `tasks/by_todo/${todo_id}`,
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

async function postTask(todo_id) {
    return await $.ajax({
        type: "POST",
        url: API_LOCATION + "tasks/",
        headers: {
            Authorization: `Bearer ${getCookie("auth_token")}`,
        },
        dataType: "json",
        data: {
            todo_id: todo_id,
            text: $(`#${todo_id}inputCreateTask`).val(),
        },
        encode: true,
        success: function (data) {
            return data;
        },
    });
}
async function updateTask(id) {
    return await $.ajax({
        type: "POST",
        url: API_LOCATION + `tasks/${id}`,
        headers: {
            Authorization: `Bearer ${getCookie("auth_token")}`,
        },
        dataType: "json",
        data: {
            _method: "PATCH",
            todo_id: $(`#${id}todoIdUpdateTask`).val(),
            text: $(`#${id}textUpdateTask`).val(),
        },
        encode: true,
        success: function (data) {
            return data;
        },
    });
}

async function addImageToTask(id) {
    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("todo_id", $(`#${id}todoIdAddImageTask`).val());
    formData.append("image", $(`#${id}fileAddImageTask`).prop("files")[0]);
    return await $.ajax({
        type: "POST",
        url: API_LOCATION + `tasks/add_image/${id}`,
        headers: {
            Authorization: `Bearer ${getCookie("auth_token")}`,
        },
        dataType: "json",
        data: formData,
        processData: false,
        contentType: false,
        encode: true,
        success: function (data) {
            return data;
        },
    });
}

async function deleteTask(id) {
    return await $.ajax({
        type: "POST",
        url: API_LOCATION + `tasks/${id}`,
        headers: {
            Authorization: `Bearer ${getCookie("auth_token")}`,
        },
        dataType: "json",
        data: {
            _method: "DELETE",
            todo_id: $(`#${id}todoIdDeleteTask`).val(),
        },
        encode: true,
        success: function (data) {
            return data;
        },
    });
}

async function findTasks(todo_id) {
    return await $.ajax({
        type: "POST",
        url: API_LOCATION + "tasks/search",
        headers: {
            Authorization: `Bearer ${getCookie("auth_token")}`,
        },
        dataType: "json",
        data: {
            todo_id: todo_id,
            search: $(`#${todo_id}textFindTask`).val(),
        },
        encode: true,
        success: function (data) {
            return data;
        },
    });
}
async function findByTagTasks(todo_id) {
    return await $.ajax({
        type: "POST",
        url: API_LOCATION + "tasks/tags_search",
        headers: {
            Authorization: `Bearer ${getCookie("auth_token")}`,
        },
        dataType: "json",
        data: {
            todo_id: todo_id,
            search: $(`#${todo_id}textFindByTagTask`).val(),
        },
        encode: true,
        success: function (data) {
            return data;
        },
    });
}

function setTasks(tasks, todo_id) {
    let formedTasks = ``;
    tasks.data.forEach((task) => {
        formedTasks += taskTemplate(task);
    });
    $(`#${todo_id}tasks`).html(formedTasks);
    return Promise.resolve(tasks);
}
async function assignTasks(tasks, todo_id) {
    await Promise.all(
        tasks.data.map(async (task) => {
            refreshTags(task.id);

            $(`#${task.id}formAddImageTask`).submit(function (event) {
                console.log("add image to task");
                addImageToTask(task.id).then(async () => {
                    await refreshTasks(todo_id);
                });
                event.preventDefault();
            });
            $(`#${task.id}formUpdateTask`).submit(function (event) {
                console.log("update task");
                updateTask(task.id).then(async () => {
                    await refreshTasks(todo_id);
                });
                event.preventDefault();
            });
            $(`#${task.id}formDeleteTask`).submit(function (event) {
                console.log("delete task");
                deleteTask(task.id).then(async () => {
                    await refreshTasks(todo_id);
                });
                event.preventDefault();
            });

            $(`#${task.id}formCreateTag`).submit(function (event) {
                console.log("delete task");
                postTag(task.id).then(async () => {
                    await refreshTasks(todo_id);
                });
                event.preventDefault();
            });
        })
    );
}

async function refreshTasks(todo_id) {
    await getTasks(todo_id)
        .then((tasks) => setTasks(tasks, todo_id))
        .then(async (tasks) => assignTasks(tasks, todo_id));
}

export { getTasks, postTask, refreshTasks, setTasks, assignTasks, findTasks, findByTagTasks};
