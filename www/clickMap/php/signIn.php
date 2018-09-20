<?php
require 'config.php';

$username = $mysql->real_escape_string($_POST['username']);
$password = $mysql->real_escape_string($_POST['password']);

$queryUser = $mysql->query("SELECT * FROM `users` WHERE `username` = '$username'");
$rowUser = $queryUser->fetch_array(MYSQLI_ASSOC);

$repeatLogin = 0;
$repeatPassword = 0;

function generateToken($length) {

    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRQSTUVWXYZ0123456789";

    $code = "";

    $clen = strlen($chars) - 1;
    while (strlen($code) < $length) {

        $code .= $chars[mt_rand(0,$clen)];
    }

    return $code;

}

if ($rowUser['username'] == $username) {
    $repeatLogin += 1;
}

if (password_verify( $password , $rowUser['password'] )) {
    $repeatPassword += 2;
}

if (($repeatLogin + $repeatPassword) == 3) {
    $token = generateToken(40);
    $userId = $rowUser['id'];
    setcookie("token", $token, time()+3600*1, '/');
    setcookie("userId", $userId, time()+3600*1, '/');
    $query = $mysql->query("INSERT INTO `userstoken` VALUES (NULL, '$userId','$token', '".time()."')");
    echo 2;
} else {
    echo $repeatLogin + $repeatPassword;
}
?>