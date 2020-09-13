<?php
  session_start();
  require_once('conn.php');

  if(empty($_POST['username'])||
    empty($_POST['nickname'])||
    empty($_POST['password'])){
    header('Location:register.php?errCode=1');
    die ('資料不齊全');
  }

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

  $sql = "INSERT INTO alirong_users (username,password,nickname) VALUES (?,?,?)";
  $stmt =$conn->prepare($sql);
  $stmt->bind_param("sss",$username, $password ,$nickname);
  $res = $stmt->execute();

  if(!$res){
    $code =$conn->errno;
    if($code===1062) {
      header('Location:register.php?errCode=2');
    }
    die($conn->error);
  }else{
    $_SESSION['username'] = $username;
    header('Location:index.php');
  }  
?>

<script>alert('ert')</script>