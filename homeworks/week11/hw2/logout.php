<?php
  session_start();
  if(!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
    print_r($_SESSION['username']);
  }
  session_destroy();
  // print_r($_SESSION['username'])
  header("Location:index.php");
?>