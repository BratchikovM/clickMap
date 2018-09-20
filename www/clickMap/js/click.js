'use strict';

function clickTracking(e) {
    const regex = /^((https?:)(\/\/\/?)([\d\w\.-]+(?::(\d+))??([\/\\\w\.()-]*)?(?:([?][^#]*)?(#.*)?)))*/gmi;
    const str = window.location.href;
    let siteName = regex.exec(str);
    var fd = new FormData;
    var xhr = CreateRequest();
    fd.append("x", e.pageX);
    fd.append("y", e.pageY);
    fd.append("ts", +Date.now());
    fd.append("siteName", siteName[4]);
    fd.append("widthWindow", window.innerWidth);
    fd.append("heightWindow", window.innerHeight);
    xhr.open('POST', 'http://localhost/php/insertClickInBd.php', false);
    xhr.send(fd);
    console.log(xhr);
    (new Date(15351235151628)).getHours();
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

window.onclick = (e) => {clickTracking(e)};