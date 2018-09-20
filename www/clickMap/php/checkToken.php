<?php

require 'config.php';

$time = time()-3600*1;
$queryDeleteToken = $mysql->query("DELETE FROM `userstoken` WHERE `time` < '$time'");
?>