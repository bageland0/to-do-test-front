import {refreshTodos, postTodo} from "./todos.js";

$(document).ready(function () {
    logoutGuest();

    refreshTodos();

    $("#username").html(JSON.parse(getCookie("user_data")).name);

    $("#formCreateTodo").submit(function (event) {
        postTodo().then(async () => {
            await refreshTodos();
        });
        event.preventDefault();
    });

    $("#logout").on("click", logout);
});
