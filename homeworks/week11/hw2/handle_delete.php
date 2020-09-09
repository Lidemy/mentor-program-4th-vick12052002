<?php
require_once('conn.php');
session_start();

if(empty($_GET['id'])){
  header("Location:system.php?errCode=1");
  die($conn->error);
}
$id = $_GET['id'];
$sql ="UPDATE `alirong_post` SET `is_delete`=1, `update_time`=current_timestamp()	 WHERE post_id=?";

$stmt = $conn->prepare($sql);
$stmt->bind_param('i',$id);
$res=$stmt->execute();

if(!$res){
  header("Location:system.php?errCode=2");
  die('處理失敗');
}
header("Location:system.php")
?>