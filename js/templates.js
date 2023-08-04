function todoTemplate(data) {
    return `<div id="${data.id}todo" class="todo card mb-5">
                        <div class="card-header text-center">
                            <div class="d-flex justify-content-between">
                                <form
                                    action=""
                                    class="mb-0 me-3"
                                    method="post"
                                    id="${data.id}formUpdateTodo"
                                >
                                    <div class="input-group">
                                        <input
                                            type="hidden"
                                            name="id"
                                            value="${data.id}"
                                            id="${data.id}idUpdateTodo"
                                        />
                                        <input
                                            type="text"
                                            class="form-control fs-3"
                                            placeholder="${data.name}"
                                            value="${data.name}"
                                            name="name"
                                            id="${data.id}nameUpdateTodo"
                                        />
                                        <button
                                            class="bg-warning-subtle btn btn-outline-warning text-black"
                                            type="submit"
                                        >
                                            Обновить
                                        </button>
                                    </div>
                                </form>
                                <form id="${data.id}formDeleteTodo" class="" action="" method="post">
                                    <input type="hidden" name="id" value="${data.id}" />
                                    <button
                                        class="bg-danger-subtle btn btn-outline-danger w-100 text-black"
                                        type="submit"
                                    >
                                        Удалить
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div class="card-body">                            
                            <button
                                class="bg-info btn fs-5 btn-outline-info text-white"
                                type="button"
                                id="${data.id}resetTasks"
                            >
                                Сбросить
                            </button>
                            <form
                                class="w-50 mx-auto mb-3"
                                id="${data.id}formFindTask"
                                method="post"
                            >
                                <div class="input-group">
                                    <input
                                        id="${data.id}todoIdFindTask"
                                        type="hidden"
                                        name="todo_id"
                                        value="1"
                                    />
                                    <textarea
                                        id="${data.id}textFindTask"
                                        type="text"
                                        class="form-control fs-4"
                                        placeholder="Найти задачу"
                                        name="name"
                                    ></textarea>
                                    <button
                                        class="bg-info btn fs-5 btn-outline-info text-white"
                                        type="submit"
                                        id="button-addon1"
                                    >
                                        Найти
                                    </button>
                                </div>
                            </form>
                            <form
                                class="w-50 mx-auto mb-5"
                                id="${data.id}formFindByTagTask"
                                method="post"
                            >
                                <div class="input-group">
                                    <input
                                        id="${data.id}todoIdFindByTagTask"
                                        type="hidden"
                                        name="todo_id"
                                        value="1"
                                    />
                                    <textarea
                                        id="${data.id}textFindByTagTask"
                                        type="text"
                                        class="form-control fs-4"
                                        placeholder="Найти задачи по тегу"
                                        name="name"
                                    ></textarea>
                                    <button
                                        class="bg-info btn fs-5 btn-outline-info text-white"
                                        type="submit"
                                        id="button-addon1"
                                    >
                                        Найти
                                    </button>
                                </div>
                            </form>
                            <form
                                class="w-50 mx-auto mb-5"
                                todo_id: $("#")
                                id="${data.id}formCreateTask"
                                method="post"
                            >
                                <div class="input-group">
                                    <input type="hidden" name="id" value="1" />
                                    <input
                                        id="${data.id}inputTodoId"
                                        type="hidden"
                                        name="todo_id"
                                        value="${data.id}"
                                    />
                                    <textarea
                                        id="${data.id}inputCreateTask"
                                        type="text"
                                        class="form-control fs-4"
                                        placeholder="Назовите задачу"
                                        name="name"
                                    ></textarea>
                                    <button
                                        class="bg-primary btn fs-5 btn-outline-primary text-white"
                                        type="submit"
                                        id="button-addon1"
                                    >
                                        Создать
                                    </button>
                                </div>
                            </form>
                            <div id="${data.id}tasks" class="tasks">
                            </div>
                        </div>
                    </div>
`;
}
function taskTemplate(data) {
    return `<div class="task w-100 mb-4 border-bottom border-top pt-3">
        <div class="d-flex justify-content-between w-100 mb-2">
            <a class="${ data.thumbnail ? "d-block" : "d-none" } me-3" href="${STORAGE_LOCATION + data.image}" style="max-width: 150px; width: 100%; height: 150px;">
                <img src="${data.thumbnail ? STORAGE_LOCATION + data.thumbnail : "" }" style="width: 100%" alt="">
            </a>
            <form id="${data.id}formAddImageTask" class="me-3" action="" method="post">
                <input id="${data.id}fileAddImageTask" class="form-control mb-2" type="file" />
                <input class="w-100" type="hidden" name="id" value="${data.id}" />
                <input
                    id="${data.id}todoIdAddImageTask"
                    class="w-100"
                    type="hidden"
                    name="todo_id"
                    value="${data.todo_id}"
                />
                <button
                    class="bg-success-subtle btn btn-outline-success w-100 text-black"
                    type="submit"
                >
                    Добавить
                </button>
            </form>
            <form
                class="task mb-3 w-100 me-3"
                method="post"
                id="${data.id}formUpdateTask"
            >
                <div class="input-group">
                    <input class="" type="hidden" name="id" value="${data.id}" />
                    <input
                        let
                        self="this;"
                        class=""
                        type="hidden"
                        name="todo_id"
                        id="${data.id}todoIdUpdateTask"
                        value="${data.todo_id}"
                    />
                    <textarea
                        id="${data.id}textUpdateTask"
                        type="text"
                        class="form-control fs-4"
                        placeholder="Назовите задачу"
                        name="name"
                    >${data.text}</textarea>
                    <button
                        class="bg-warning-subtle btn btn-outline-warning fs-5 text-black"
                        type="submit"
                        id="button-addon1"
                    >
                        Обновить
                    </button>
                </div>
            </form>
            <form id="${data.id}formDeleteTask" class="" action="" method="post">
                <input class="" type="hidden" name="id" value="${data.id}" />
                <input class="" type="hidden" name="todo_id" value="${data.todo_id}" />
                <button
                    class="bg-danger-subtle btn btn-outline-danger w-100 text-black"
                    type="submit"
                >
                    Удалить
                </button>
            </form>
    </div>
    <div class="">
        <div id="${data.id}tags" class="tags mw-100 d-flex flex-wrap" style="width: fit-content;">
        </div>
        <form id="${data.id}formCreateTag" class="" action="" style="max-width: 360px;" method="post">
            <div class="input-group">
                <span class="input-group-text" id="basic-addon1">#</span>
                <input
                    id="${data.id}nameCreateTag"
                    type="text"
                    class="form-control"
                    placeholder="Назовите тэг"
                    name="name"
                />
                <button
                    class="bg-primary btn btn-outline-primary text-white"
                    type="submit"
                    id="button-addon1"
                >
                    Создать
                </button>
            </div>
        </form>
    </div>
</div>`;
}

function tagTemplate(data) {
    return `<div id="${data.id}tag" class="input-group tag me-2 mb-2" style="max-width: 360px; height: fit-content;">
        <form action="" id="${data.id}formUpdateTag" method="post"></form>
        <form action="" id="${data.id}formDeleteTag" method="post"></form>
        <input
            id="${data.id}taskIdUpdateTag"
            type="hidden"
            name="task_id"
            value="${data.task_id}"
            form="${data.id}formUpdateTag"
        />
        <input
            id="${data.id}taskIdDeleteTag"
            type="hidden"
            name="task_id"
            value="${data.task_id}"
            form="${data.id}formDeleteTag"
        />  
        <span class="input-group-text" id="basic-addon1">#</span>
        <input
            id="${data.id}nameUpdateTag"
            type="text"
            class="form-control"
            placeholder="${data.name}"
            value="${data.name}"
            name="name"
            form="${data.id}formUpdateTag"
        />
        <button
            class="bg-warning-subtle btn btn-outline-warning text-black"
            type="submit"
            id="button-addon1"
            form="${data.id}formUpdateTag"
        >
            Обновить
        </button>
        <button
            class="bg-danger-subtle btn btn-outline-danger text-black"
            type="submit"
            id="button-addon1"
            form="${data.id}formDeleteTag"
        >
            Удалить
        </button>
    </div>`
}


export { todoTemplate, taskTemplate, tagTemplate };
