$(document).ready(function () {
    $("#form").submit(function (event) {
        var formData = {
            name: $("#formName").val(),
            email: $("#formEmail").val(),
            password: $("#formPassword").val(),
        };

        $.ajax({
            type: "POST",
            url: API_LOCATION + "register",
            data: formData,
            dataType: "json",
            encode: true,
            success: function (data) {
                $.ajax({
                    type: "POST",
                    url: API_LOCATION + "login",
                    data: formData,
                    dataType: "json",
                    encode: true,
                }).done(function (data) {
                    document.cookie = `auth_token=${data['token']}`
                    window.location.href = 'dashboard.html'
                });
            },
            error: function (data) {
                $("#error").toggleClass("d-none d-block");
            },
        })

        event.preventDefault();
    });
});
