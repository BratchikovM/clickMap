<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/main.css"/>
    <title>Click Map</title>
    <style>
        body {
            font-family: Tahoma, Verdana, Arial, sans-serif;
        }
    </style>
</head>
<body>
<div class="wrap">
<?php
error_reporting( E_ERROR );
if ($_COOKIE['token'] == null) { ?>
    <div class="content_center">
        <div class="signUp"><a href="signUp.html">Зарегистрироваться</a></div>
        <div class="signIn"><a href="signIn.html">Войти</a></div>
    </div>
<?php
} else {?>
        <div class="content_center">
            <div class="clickMap"><a href="clickMap.html">Карта кликов</a></div>
            <div class="statisticsOfClicksOnTheClock"><a href="statisticsOfClicksOnTheClock.html">Статистика
                    активности по часам</a></div>
        </div>
<?php
}?>
</div>
<script src="/js/click.js"></script>
</body>
</html>