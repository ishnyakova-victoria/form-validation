window.onload = function(e) {
    var form = document.querySelector("form");
    var inputs = document.querySelectorAll(".field input");
    var password = document.querySelector("#password");

    var regName = /^[А-Яа-яЁёA-Za-z-]{1,40}$/;
    var regEmail = /^[A-Za-z-._]+@[a-z]+\.[a-z]{2,3}$/;
    var regPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/;
    var regDate = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\.(0[1-9]|1[0-2])\.[0-9]{4}$/;

    form.onsubmit = function(e) {
        var error = false;
        
        for (var i = 0; i < inputs.length; i++) {
            var id = inputs[i].id;
            var value = inputs[i].value;

            if (value === "") {
                inputs[i].nextElementSibling.innerHTML = "Заполните данное поле.";
                error = true;
            } else {
                switch (id) {
                    case "name":
                        if (!regName.test(value)) {
                            inputs[i].nextElementSibling.innerHTML = "Некорректное имя.";
                            error = true;
                        }
                        break;
                    case "surname":
                        if (!regName.test(value)) {
                            inputs[i].nextElementSibling.innerHTML = "Некорректная фамилия.";
                            error = true;
                        }
                        break;
                    case "email":
                        if (!regEmail.test(value)) {
                            inputs[i].nextElementSibling.innerHTML = "Некорректный Email. Формат Email: example@mail.com";
                            error = true;
                        }
                        break;
                    case "password":
                        if (!regPassword.test(value)) {
                            inputs[i].nextElementSibling.innerHTML = "Некорректный пароль. Длина пароля: не менее 8 символов. Пароль должен содержать цифры, строчные и прописные буквы и символы.";
                            error = true;
                        }
                        break;
                    case "repeat-password":
                        if (value !== password.value) {
                            inputs[i].nextElementSibling.innerHTML = "Пароли не совпадают.";
                            error = true;
                        }
                        break;
                    case "date":
                        if (!regDate.test(value)) {
                            inputs[i].nextElementSibling.innerHTML = "Некорректная дата. Формат даты: дд.мм.гггг";
                            error = true;
                        } else {
                            var date = value.split(".");
                            var year = +date[2];
                            var month = +date[1];
                            var day = +date[0];

                            var today = new Date();
                            var currentYear = today.getFullYear();
                            var currentMonth = today.getMonth() + 1;
                            var currentDay = today.getDate();

                            var age = currentYear - year;

                            if (currentMonth < month || (currentMonth == month && currentDay < day)) {
                                age--;
                            }

                            if (age < 18) {
                                inputs[i].nextElementSibling.innerHTML = "Возраст должен быть не младше 18 лет.";
                                error = true;
                            }
                        }
                        break;
                }

                if (!error) {
                    inputs[i].nextElementSibling.innerHTML = "";
                }
            }
        }

        if (error) {
            e.preventDefault();
        }
    };
};