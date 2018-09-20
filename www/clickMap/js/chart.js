'use strict';

function chart() {
    document.getElementById('wrap').remove();
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['00:00-1:00','1:00-2:00','2:00-3:00','3:00-4:00','4:00-5:00','5:00-6:00','6:00-7:00','7:00-8:00','8:00-9:00','9:00-10:00','10:00-11:00','11:00-12:00','12:00-13:00','13:00-14:00','14:00-15:00','15:00-16:00','16:00-17:00','17:00-18:00','19:00-20:00','20:00-21:00','21:00-22:00','22:00-23:00','23:00-00:00'],
            datasets: [{
                label: '% Активности',
                data: analysisTime(),
                borderWidth: 1
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Статистика: '+allGetParam()['page']
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}

function analysisTime() {
    let arrTs = JSON.parse(getInfoSite());
    var objTime = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0, 11: 0, 12: 0, 13: 0, 14: 0, 15: 0, 16: 0, 17: 0, 18: 0, 19: 0, 20: 0, 21: 0, 22: 0, 23: 0};
    for (var i = 1; i < arrTs.length; i++) {
        let hour = new Date(parseInt(arrTs[i]['ts']));
        if (arrTs.indexOf(hour.getHours()) === -1) {
            let curTime = hour.getHours();
            var count = 0;
            for (var j = 0; j < arrTs.length; j++) {
                let hour = new Date(parseInt(arrTs[j]['ts']));
                if (curTime === hour.getHours()) {
                    count++;
                }
            }
            objTime[curTime] = count;
        }
    }
    var arrTime = [];
    var totalCount = 0;
    for (var i = 0; i < 24; i++) {
        totalCount += objTime[i];
    }
    console.log(totalCount);
    for (var i = 0; i < 24; i++) {
        let percent = (objTime[i]/totalCount)*100;
        arrTime.push(percent);
    }
    console.log(arrTime);
    return arrTime;
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

function getListSiteName() {
    var xhr = CreateRequest();
    xhr.open('POST', 'http://localhost/php/getListSiteName.php', false);
    xhr.send();
    return xhr.responseText;
}

function getInfoSite() {
    var xhr = CreateRequest();
    xhr.open('GET', `http://localhost/php/getInfoSite.php${window.location.search}`, false);
    xhr.send();
    return xhr.responseText;
}

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

// Навигация
if (allGetParam()['page'] !== undefined) {
    chart();
}else {
    generateListSiteName();
}