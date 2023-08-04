import { tagTemplate } from "./templates.js";

async function getTags(task_id) {
    return await $.ajax({
        type: "GET",
        url: API_LOCATION + `tags/by_task/${task_id}`,
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

async function postTag(task_id) {
    return await $.ajax({
        type: "POST",
        url: API_LOCATION + "tags/",
        headers: {
            Authorization: `Bearer ${getCookie("auth_token")}`,
        },
        dataType: "json",
        data: {
            task_id: task_id,
            name: $(`#${task_id}nameCreateTag`).val(),
        },
        encode: true,
        success: function (data) {
            return data;
        },
    });
}
async function updateTag(id) {
    return await $.ajax({
        type: "POST",
        url: API_LOCATION + `tags/${id}`,
        headers: {
            Authorization: `Bearer ${getCookie("auth_token")}`,
        },
        dataType: "json",
        data: {
            _method: "PATCH",
            task_id: $(`#${id}taskIdUpdateTag`).val(),
            name: $(`#${id}nameUpdateTag`).val(),
        },
        encode: true,
        success: function (data) {
            return data;
        },
    });
}

async function deleteTag(id) {
    return await $.ajax({
        type: "POST",
        url: API_LOCATION + `tags/${id}`,
        headers: {
            Authorization: `Bearer ${getCookie("auth_token")}`,
        },
        dataType: "json",
        data: {
            _method: "DELETE",
            task_id: $(`#${id}taskIdDeleteTag`).val(),
        },
        encode: true,
        success: function (data) {
            return data;
        },
    });
}

async function refreshTags(task_id) {
    let formedTags = ``;

    function refresh(tags) {
        tags.forEach((tag) => {
            formedTags += tagTemplate(tag);
        });
        $(`#${task_id}tags`).html(formedTags);
        return tags;
    }

    let tagsPromise = new Promise(async (resolve, reject) => {
        let tags = await getTags(task_id);
        if ((await tags.length) <= 0) {
            refresh(tags);
            return;
        }
        resolve(tags);
    });

    await tagsPromise
        .then((tags) => refresh(tags))
        .then((tags) => {
            tags.forEach((tag) => {
                $(`#${tag.id}formUpdateTag`).submit(function (event) {
                    console.log("update tag");
                    updateTag(tag.id).then(async () => {
                        await refreshTags(task_id);
                    });
                    event.preventDefault();
                });
                $(`#${tag.id}formDeleteTag`).submit(function (event) {
                    console.log("delete tag");
                    deleteTag(tag.id).then(async () => {
                        await refreshTags(task_id);
                    });
                    event.preventDefault();
                });
            });
        });
}

export { getTags, postTag, refreshTags };
