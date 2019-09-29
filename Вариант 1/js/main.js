window.onload = function(e) {
    var submit = document.querySelector("input[type='submit']");
    var inputs = document.querySelectorAll(".field input");
    var password = document.querySelector("#password");

    var regName = /^[А-Яа-яЁёA-Za-z-]{1,40}$/;
    var regEmail = /^[A-Za-z-._]+@[a-z]+\.[a-z]{2,3}$/;
    var regPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{8,}$/;
    var regDate = /^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\.(0[1-9]|1[0-2])\.[0-9]{4}$/;
    
    submit.setAttribute("disabled", "disabled");
    submit.classList.add("disabled");

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].onblur = function(e) {
            var id = this.id;
            var value = this.value;

            var error = false;
            var empty = false;

            if (value === "") {
                this.nextElementSibling.innerHTML = "Заполните данное поле.";
                error = true;
            } else {
                switch (id) {
                    case "name":
                        if (!regName.test(value)) {
                            this.nextElementSibling.innerHTML = "Некорректное имя.";
                            error = true;
                        }
                        break;
                    case "surname":
                        if (!regName.test(value)) {
                            this.nextElementSibling.innerHTML = "Некорректная фамилия.";
                            error = true;
                        }
                        break;
                    case "email":
                        if (!regEmail.test(value)) {
                            this.nextElementSibling.innerHTML = "Некорректный Email. Формат Email: example@mail.com";
                            error = true;
                        }
                        break;
                    case "password":
                        if (!regPassword.test(value)) {
                            this.nextElementSibling.innerHTML = "Некорректный пароль. Длина пароля: не менее 8 символов. Пароль должен содержать цифры, строчные и прописные буквы и символы.";
                            error = true;
                        }
                        break;
                    case "repeat-password":
                        if (value !== password.value) {
                            this.nextElementSibling.innerHTML = "Пароли не совпадают.";
                            error = true;
                        }
                        break;
                    case "date":
                        if (!regDate.test(value)) {
                            this.nextElementSibling.innerHTML = "Некорректная дата. Формат даты: дд.мм.гггг";
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
                                this.nextElementSibling.innerHTML = "Возраст должен быть не младше 18 лет.";
                                error = true;
                            }
                        }
                        break;
                }

                if (!error) {
                    this.nextElementSibling.innerHTML = "";
                }
            }

            for (var j = 0; j < inputs.length; j++) {
                if (inputs[j].value === "") {
                    empty = true;
                }
            }

            if (!error && !empty) {
                submit.removeAttribute("disabled");
                submit.classList.remove("disabled");
            }
        };
    }
};