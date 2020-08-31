<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if(empty($_POST['username'])||
    empty($_POST['password'])){
    header('Location:register.php?errCode=1');
    die ('資料不齊全');
  }
  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf("SELECT * FROM alirong_users WHERE username='%s' AND password='%s'",
  $username,
  $password);

  $res = $conn->query($sql);

  if(!$res){
    header('Location:login.php?errCode=2');
    die($conn->error);
  }
  if($res->num_rows){
    $_SESSION['username'] = $username;
    header('Location:index.php');
  }else{
    header('Location:login.php?errCode=2');
  }
?>