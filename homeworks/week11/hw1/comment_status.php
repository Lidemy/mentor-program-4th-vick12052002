<?php
  require_once('conn.php');
  $sql = "SELECT * FROM  alirong_comments order by created_time ASC";
  $res = $conn->query($sql);
  for( $i = 0; $i < $res->num_rows; $i += 1){
    $row =$res->fetch_assoc();
    echo $row['username'] . '<br>';
    echo $row['comment'] . '<br>';
  }
?>