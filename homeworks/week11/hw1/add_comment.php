<?php
  require_once('conn.php');
  require_once('utils.php');
  if(empty($_POST['comment'])){
    header('Location:index.php?errCode=1');
    die ('資料不齊全');
  }

  $username = $_SESSION['username'];
  $comment = $_POST['comment'];
  $authority = getIdentityAuthority($username);
  if($authority === 0){
    header('Location:index.php');
    exit();
  }
  $sql = "INSERT INTO alirong_comments (username,comment) VALUES (?,?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss',$username, $comment);
  $res = $stmt->execute();

  if(!$res){
    echo $conn->error;
  }else{
    header('Location:index.php');
  }  
?>