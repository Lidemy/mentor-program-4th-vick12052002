<?php
require_once('conn.php');
require_once('utils.php');

if (empty($_GET['id'])) {
  header('Location:index.php?errCode=1');
  die('資料不齊全');
}
$id = $_GET['id'];
$username = $_SESSION['username'];
$authority = getIdentityAuthority($username);

$sql = "UPDATE alirong_comments  SET is_deleted=1 WHERE id=? and username=?";
if ($authority == 2) {
  $sql = "UPDATE alirong_comments  SET is_deleted=1 WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
} else {
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('is', $id, $username);
}
$res = $stmt->execute();


if (!$res) {
  die($conn->error);
}
header('Location:index.php');
