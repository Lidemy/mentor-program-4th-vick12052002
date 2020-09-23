<?php
require_once('conn.php');
require_once('utils.php');

if (
  empty($_POST['comment'])
) {
  header('Location:update_comment.php?errCode=1&id=' . $_POST['id']);
  die('資料不齊全');
}
$username = $_SESSION['username'];
$comment = $_POST['comment'];
$id = $_POST['id'];
$authority = getIdentityAuthority($username);
$sql = "UPDATE alirong_comments SET comment=? WHERE id=? and username=?";
if ($authority === 2) {
  $sql = "UPDATE alirong_comments SET comment=? WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $comment, $id);
} else {
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sis', $comment, $id, $username);
}
$res = $stmt->execute();


if (!$res) {
  header('Location:update_comment.php?errCode=2');
  die($conn->error);
}
header('Location:index.php');
