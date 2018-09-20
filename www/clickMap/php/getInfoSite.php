<?php

require 'config.php';
require 'checkToken.php';

if (isset($_GET['page']) && !isset($_GET['width'])) {
    $siteName = $_GET['page'];

    $queryWidthSite = $mysql->query("SELECT `widthWindow`, `heightWindow`, `ts` FROM `infoClick`  WHERE `siteName` = '$siteName' ORDER BY `widthWindow` DESC");
    $arrWidthSite = $queryWidthSite->fetch_all();
    $arr = [$siteName];

    foreach ($arrWidthSite as $widthSite) {
        array_push($arr, [
            'widthWindow' => $widthSite[0],
            'heightWindow' => $widthSite[1],
            'ts' => $widthSite[2]
        ]);
    }
    $result = json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    echo $result;
}

if (isset($_GET['page']) && isset($_GET['width']) && isset($_GET['height'])) {
    $siteName = $_GET['page'];
    $widthSite = $_GET['width'];
    $heightSite = $_GET['height'];
    $queryInfoSite = $mysql->query("SELECT `x`, `y` FROM `infoClick`  WHERE `siteName` = '$siteName' AND `widthWindow` = '$widthSite' AND `heightWindow` = '$heightSite'");
    $arrInfoSite = $queryInfoSite->fetch_all();
    $arr = [$siteName];

    foreach ($arrInfoSite as $infoSite) {
        array_push($arr, [
            'x'           => $infoSite[0],
            'y'           => $infoSite[1],
        ]);
    }
    $result = json_encode($arr, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    echo $result;
}

