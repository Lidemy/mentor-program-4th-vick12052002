<?php
  require_once('conn.php');
  require_once('utils.php');
  if(empty($_POST['comment'])){
    header('Location:index.php?errCode=1');
    die ('資料不齊全');
  }

  $user = getUserFromUsername($_SESSION['username']);
  $nickname = $user['nickname'];
  $comment = $_POST['comment'];

  $sql = sprintf("INSERT INTO alirong_comments (username,comment) VALUES ('%s','%s')",
  $nickname,
  $comment);
  $res = $conn->query($sql);

  if(!$res){
    echo $conn->error;
  }else{
    header('Location:index.php');
  }  
?>