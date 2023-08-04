$(document).ready(function () {
    $("#form").submit(function (event) {
        var formData = {
            email: $("#formEmail").val(),
            password: $("#formPassword").val(),
        };

        $.ajax({
            type: "POST",
            url: API_LOCATION + "login",
            data: formData,
            dataType: "json",
            encode: true,
            success: function (data) {
                document.cookie = `auth_token=${data.token}`;
                getUser().then((user) => {
                    document.cookie = `user_data=${JSON.stringify(user)}`;
                    window.location.href = "dashboard.html";
                });
            },
            error: function (data) {
                $("#error").toggleClass("d-none d-block");
            },
        });

        event.preventDefault();
    });
});
