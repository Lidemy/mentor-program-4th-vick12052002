<?php
require_once('conn.php');
session_start();

if(empty($_POST['title'])||
   empty($_POST['type'])||
   empty($_POST['content'])){
  header("Location:add_post.php?errCode=1");
  die('資料未填完整');
}
$username = $_SESSION['username'];
$title = $_POST['title'];
$type = $_POST['type'];
$content = $_POST['content'];
$id = $_POST['id'];

$sql ="INSERT INTO `alirong_post`(`username`, `title`, `content`,`type`) VALUES (?,?,?,?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('sssi',$username,$title,$content,$type);
$res=$stmt->execute();

if(!$res){
  header("Location:add_post.php?errCode=2");
  die($conn->error);
}
echo '輸入成功';
  header("Location:system.php");

?>