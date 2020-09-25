<?php
require_once('conn.php');
session_start();

if(empty($_POST['username'])||empty($_POST['password'])){
  header("Location:login.php?errCode=1");
  die('資料未填完整');
}
$username = $_POST['username'];
$password = $_POST['password'];

$sql ="SELECT * FROM alirong_users where username=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s',$username);
$res=$stmt->execute();

if(!$res){
  header("Location:login.php?errCode=2");
  die('查無此帳戶');
}

$res = $stmt->get_result();
$row = $res->fetch_assoc();
if(password_verify($password,$row['password'])){
  $_SESSION['username'] = $username ;
  header("Location:index.php");
}else{
  header("Location:login.php?errCode=2");
}
?>