const API_LOCATION = "http://127.0.0.1:8000/api/";
const STORAGE_LOCATION = "http://127.0.0.1:8000/storage/";

function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(";").forEach(function (el) {
        let [key, value] = el.split("=");
        cookie[key.trim()] = value;
    });
    return cookie[cookieName];
}

function getUser() {
    return $.ajax({
        type: "GET",
        url: API_LOCATION + "users/current",
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

function logout() {
    document.cookie = `auth_token=`;
    document.cookie = `username=`;
    window.location.href = "index.html";
}

function toDashboard() {
    window.location.href = "dashboard.html";
}

function userIsIn() {
    return getCookie("auth_token") ? true : false;
}

function logoutGuest() {
    userIsIn() ? true : logout();
}

(function () {
    if (window.location.pathname != "/dashboard.html") {
        userIsIn() ? toDashboard() : false;
    }
})();
