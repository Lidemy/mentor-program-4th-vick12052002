<?php
  session_start();
  require_once('conn.php');

  if(empty($_POST['nickname'])){
    header('Location:index.php?&errCode=1');
    die ('資料不齊全');
  }

  $nickname = $_POST['nickname'];;
  $username = $_SESSION['username'];
  print_r($username);
  $sql = "UPDATE `alirong_users` SET `nickname`=?  WHERE `username`=?";
  $stmt =$conn->prepare($sql);
  $stmt->bind_param("ss",$nickname ,$username);
  $res = $stmt->execute();


  if(!$res){
    $code =$conn->errno;
    if($code===1062) {
      header('Location:index.php?errCode=2');
    }
    die($conn->error);
  }else{
    $_SESSION['username'] = $username;
    header('Location:index.php');
  }  
?>

<script>alert('ert')</script>