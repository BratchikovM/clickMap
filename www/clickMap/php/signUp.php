<?php

require 'config.php';

$username = $mysql->real_escape_string($_POST['username']);
$password = $mysql->real_escape_string(password_hash($_POST['password'], PASSWORD_DEFAULT));

$queryUser = $mysql->query("SELECT `username` FROM `users` WHERE `username`='$username'");
$rowUser = $queryUser->fetch_array(MYSQLI_ASSOC);
$repeatUser = false;

if ($rowUser['username'] == $username) {
    $repeatUser = true;
}
echo $repeatUser;
if (!$repeatUser) {
    $query = $mysql->query("INSERT INTO `users` VALUE (NULL, '$username', '$password')");
}
