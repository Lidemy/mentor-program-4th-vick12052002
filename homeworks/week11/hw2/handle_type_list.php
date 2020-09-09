<?php
require_once('conn.php');
require_once('utils.php');
session_start();

if (empty($_GET['type'])) {
  header("Location:category.php?errCode=1");
  die($conn->error);
}
$type = $_GET['type'];
$sql = "SELECT * FROM alirong_post WHERE is_delete IS NULL AND type=? ORDER BY `post_id` DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $type);
$res = $stmt->execute();

if (!$res) {
  header("Location:category.php?errCode=2");
  die('處理失敗');
}
$res = $stmt->get_result();

?>