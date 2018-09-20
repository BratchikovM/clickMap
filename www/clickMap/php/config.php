<?php

$dbHost = 'localhost';
$dbName = 'clickMap';
$dbUser = 'root';
$dbPass = '12345678';

$mysql = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
$mysql->set_charset("utf8");