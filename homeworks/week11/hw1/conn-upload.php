<?php
$server_name = 'localhost';
  $username = 'mtr04group5';
  $password = 'Lidemymtr04group5';
  $db_name = 'mtr04group5';
  
  $conn = new mysqli($server_name, $username, $password, $db_name);

  if ($conn->connect_error) {
    die('資料庫連線錯誤' . $conn->connect_error);
  }

  $conn->query('SET NAMES UTF8'); //設定編碼
  $conn->query('SET time_zone = "+8:00"'); //將資料庫時區設為台灣的時區
?>