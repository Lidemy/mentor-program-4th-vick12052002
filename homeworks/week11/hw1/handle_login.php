<?php
session_start();
require_once('conn.php');
require_once('utils.php');

if (
  empty($_POST['username']) ||
  empty($_POST['password'])
) {
  header('Location:login.php?errCode=1');
  die('資料不齊全');
}
$username = $_POST['username'];
$password = $_POST['password'];

$sql = "SELECT * FROM alirong_users WHERE username=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s',$username);
$res = $stmt->execute();


if (!$res) {
  header('Location:login.php?errCode=2');
  die($conn->error);
}

$res = $stmt->get_result();
if ($res->num_rows === 0) {
  header('Location:login.php?errCode=2');
  exit();
}
$row = $res->fetch_assoc();
if (password_verify($password, $row['password'])) {
  $_SESSION['username'] = $username;
  header('Location:index.php');
} else {
  header('Location:login.php?errCode=2');
}
