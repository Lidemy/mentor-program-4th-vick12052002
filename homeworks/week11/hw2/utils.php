<?php
require_once('./conn.php');
function getPostData($username){
  global $conn;
  $sql = "SELECT * FROM alirong_post where username=? AND is_delete IS NULL";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $res = $stmt->execute();
  if (!$res) {
    die($conn->errno);
  }
  $res = $stmt->get_result();
  return $res;
}

function escape($string){
  $newStr = htmlspecialchars($string, ENT_QUOTES);
  return $newStr;
}

function getTypeData($type){
  global $conn;
  $sql = "SELECT * FROM alirong_post where type=? AND is_delete IS NULL";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $type);
  $res = $stmt->execute();
  if (!$res) {
    die($conn->errno);
  }
  $res = $stmt->get_result();
  return $res;
}
