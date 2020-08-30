<?php
session_start();
require_once('conn.php');

function generateToken(){
  $s = '';
  for ($i = 1; $i <= 16; $i += 1) {
    $s .= chr(rand(65, 90));
  }
  return $s;
}

function getUserFromUsername($username){
  global $conn ;   //在 function 內連線一定要加 global
  $sql = sprintf(
    "SELECT * FROM alirong_users WHERE username='%s'",
    $username
  );

  $res = $conn->query($sql);
  if (!$res) {
    die($conn->error);
  }
  $result = $conn->query($sql);
  $row = $result->fetch_assoc();
  return $row;
}
