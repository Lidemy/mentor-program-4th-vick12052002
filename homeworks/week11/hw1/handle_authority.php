<?php
require_once('conn.php');
require_once('utils.php');

if (!isset($_POST['authority'])) {
  header('Location:management_system.php?errCode=1');
  die('資料不齊全');
}
$authority=$_POST['authority'];
$id = $_POST['id'];
print_r($id);
$sql = "UPDATE alirong_users SET authority=? WHERE id=? ";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii',$authority,$id);
$res = $stmt->execute();


if (!$res) {
  header('Location:management_system.php?errCode=2');
  die($conn->error);
}
header('Location:management_system.php');
