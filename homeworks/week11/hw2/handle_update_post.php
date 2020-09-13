<?php
require_once('conn.php');
session_start();

if(empty($_POST['title'])||
   empty($_POST['type'])||
   empty($_POST['content']||
   empty($_POST['id']))){
  header("Location:update.php?errCode=1");
  die('資料未填完整');
}
$username = $_SESSION['username'];
$title = $_POST['title'];
$type = $_POST['type'];
$content = $_POST['content'];
$id = $_POST['id'];

$sql ="UPDATE `alirong_post` SET `title`=?,`type`=?,`content`=?, `update_time`=current_timestamp()	 WHERE post_id=? AND username=?";

$stmt = $conn->prepare($sql);
$stmt->bind_param('sisis',$title,$type,$content,$id,$username);
$res=$stmt->execute();

if(!$res){
  header("Location:update.php?errCode=2");
  die($conn->error);
}
echo '輸入成功';
  header("Location:system.php");

?>