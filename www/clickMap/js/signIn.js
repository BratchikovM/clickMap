'use strict';

let username = document.getElementById('username');
let password = document.getElementById('password');
let messageError = document.getElementById('error');

function validateUsername() {
    if (username.value.replace(/\s/g, '') == '') {
        username.style.border = '1px solid #FC0107';
        messageError.style.display = 'block';
        return false;
    } else {
        username.style.border = '1px solid #c0c0c0';
        messageError.style.display = 'none';
        return true;
    }
}

function validatePassword() {
    if (password.value.replace(/\s/g, '') == '') {
        password.style.border = '1px solid #FC0107';
        messageError.style.display = 'block';
        return false;
    } else if (password.value.replace(/\s/g, '') != '') {
        password.style.border = '1px solid #c0c0c0';
        messageError.style.display = 'none';
        return true;
    }
}

function auth() {
    if (validateUsername() && validatePassword()) {
        var fd = new FormData;
        var xhr = CreateRequest();
        fd.append("username", username.value);
        fd.append("password", password.value);
        xhr.open('POST', 'http://localhost/php/signIn.php', false);
        xhr.send(fd);
        console.log(xhr);
        if (xhr.responseText == 1) {
            password.style.border = '1px solid #FC0107';
            messageError.style.display = 'block';
        } else if (xhr.responseText == 0) {
            username.style.border = '1px solid #FC0107';
            password.style.border = '1px solid #FC0107';
            messageError.style.display = 'block';
        } else {
            window.location.href = "/";
        }
    }
}


function CreateRequest() {
    var Request = false;

    if (window.XMLHttpRequest) {
        //Gecko-совместимые браузеры, Safari, Konqueror
        Request = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //Internet explorer
        try {
            Request = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (CatchException) {
            Request = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }

    if (!Request) {
        alert("Невозможно создать XMLHttpRequest");
    }

    return Request;
}

window.document.addEventListener('keypress', function(e) {if(e.keyCode === 13) auth();});
