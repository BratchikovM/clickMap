'use strict';
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

// Список страниц
function generateListSiteName() {
    let listSiteName = JSON.parse(getListSiteName());
    for (var i = 0; i < listSiteName.length; i++) {
        var div = document.createElement('div');
        div.className = 'site_name button';
        div.innerHTML = '<a href="?page='+listSiteName[i][0]+'">'+listSiteName[i][0]+'</a>';
        document.getElementById('column_name_site').appendChild(div);
    }
}

// Получение списка страниц
function getListSiteName() {
    var xhr = CreateRequest();
    xhr.open('POST', 'http://localhost/php/getListSiteName.php', false);
    xhr.send();
    return xhr.responseText;
}

// Список ширины и высоты экранов
function listWidthSite() {
    let widthSite = JSON.parse(getInfoSite());
    console.log(widthSite);
    var div = document.createElement('div');
    div.className = 'site_name';
    div.innerHTML = `<h2>${widthSite[0]}</h2>`;
    document.getElementById('column_name_site').appendChild(div);
    var arr = [];
    for (var i = 1; i < widthSite.length; i++) {
        if (find(arr, widthSite[i]) === 0) {
            arr.push(widthSite[i]);
            var divWidth = document.createElement('div');
            divWidth.className ='button';
            divWidth.innerHTML = '<a href="'+window.location.search+'&width='+widthSite[i]['widthWindow']+'&height='+widthSite[i]['heightWindow']+'">'+widthSite[i]['widthWindow']+'X'+widthSite[i]['heightWindow']+'</a>';
            document.getElementById('column_name_site').appendChild(divWidth);

        }

    }
}

// Информация по странице
function showInfoSite() {
    let infoSite = JSON.parse(getInfoSite());

    var divIf = document.createElement('div');
    divIf.className ='divIf';
    divIf.id ='divIf';
    divIf.innerHTML = `<iframe src=${infoSite[0]} width=${allGetParam()['width']} height=${allGetParam()['height']} frameborder="0"></iframe>`;
    document.getElementById('column_name_site').appendChild(divIf);
    analysisInfo(infoSite);
}

// Получение информации страницы
function getInfoSite() {
    var xhr = CreateRequest();
    xhr.open('GET', `http://localhost/php/getInfoSite.php${window.location.search}`, false);
    xhr.send();
    return xhr.responseText;
}

// Вставка пикселей
function analysisInfo(infoSite) {
    console.log(infoSite);
    var canvasDiv = document.createElement('div');
    let inheritDivIf = document.getElementById('divIf');
    canvasDiv.className = 'canvas';
    canvasDiv.id = 'canvas';
    canvasDiv.style.width = inheritDivIf.offsetWidth+'px';
    canvasDiv.style.height = inheritDivIf.offsetHeight+'px';
    canvasDiv.style.position = 'absolute';
    document.getElementById('column_name_site').appendChild(canvasDiv);

    for (var i = 1; i < infoSite.length; i++) {
        var count = 0;
        for (var j = 0; j < infoSite.length; j++) {
            if ( (infoSite[i]['x'] === infoSite[j]['x']) && (infoSite[i]['y'] === infoSite[j]['y'])) {
                count++;
            }
        }
        if (count < 10) {
            var greenDiv = document.createElement('div');
            greenDiv.className = 'green_div';
            greenDiv.style.top = infoSite[i]['y']+'px';
            greenDiv.style.left = infoSite[i]['x']+'px';
            greenDiv.style.width = '3px';
            greenDiv.style.height = '3px';
            greenDiv.style.backgroundColor = 'green';
            greenDiv.style.position = 'absolute';
            document.getElementById('canvas').appendChild(greenDiv);
        } else if (count < 20 && count >= 10) {
            var yellowDiv = document.createElement('div');
            yellowDiv.className = 'yellow_div';
            yellowDiv.style.top = infoSite[i]['y']+'px';
            yellowDiv.style.left = infoSite[i]['x']+'px';
            yellowDiv.style.width = '3px';
            yellowDiv.style.height = '3px';
            yellowDiv.style.zIndex = '9999';
            yellowDiv.style.backgroundColor = 'yellow';
            yellowDiv.style.position = 'absolute';
            document.getElementById('canvas').appendChild(yellowDiv);
        } else {
            var redDiv = document.createElement('div');
            redDiv.className = 'red_div';
            redDiv.style.top = infoSite[i]['y']+'px';
            redDiv.style.left = infoSite[i]['x']+'px';
            redDiv.style.width = '3px';
            redDiv.style.height = '3px';
            redDiv.style.zIndex = '9999';
            redDiv.style.backgroundColor = 'red';
            redDiv.style.position = 'absolute';
            document.getElementById('canvas').appendChild(redDiv);
        }
    }

}

// GET параметры
function allGetParam() {
    var params = window
        .location
        .search
        .replace('?','')
        .split('&')
        .reduce(
            function(p,e){
                var a = e.split('=');
                p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
                return p;
            },
            {}
        );
    return params;
}

function find(arr, search) {
    console.log(search);
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        console.log(arr[i]['widthWindow']);
        console.log(search['widthWindow']);
        console.log(arr[i]['heightWindow']);
        console.log(search['heightWindow']);
        if ( (arr[i]['widthWindow'] === search['widthWindow']) && (arr[i]['heightWindow'] === search['heightWindow']))  {
            count++;
        }
    }
    return count;
}


// Навигация
if ( (allGetParam()['page'] !== undefined) && (allGetParam()['width'] === undefined) ) {
    listWidthSite();
} else if ( (allGetParam()['page'] !== undefined) && (allGetParam()['width'] !== undefined) ) {
    showInfoSite();
} else {
    generateListSiteName();
}


