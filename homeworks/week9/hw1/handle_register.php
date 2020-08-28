<?php
  require_once('conn.php');

  if(empty($_POST['username'])||
    empty($_POST['nickname'])||
    empty($_POST['password'])){
    header('Location:register.php?&errCode=1');
    die ('資料不齊全');
  }

  $nickname = $_POST['nickname'];
  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf("INSERT INTO alirong_users (username,password,nickname) VALUES ('%s','%s','%s')",
  $username,
  $password,
  $nickname);

  $res = $conn->query($sql);

  if(!$res){
    $code =$conn->errno;
    if($code===1062) {
      header('Location:register.php?errCode=2');
    }
    die($conn->error);
  }else{
    echo '成功';
    header('Location:index.php');
  }  
?>