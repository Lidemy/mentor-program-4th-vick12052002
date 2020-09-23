<?php
require_once('conn.php');
require_once('utils.php');

 $id= $_GET['id'];
$sql =  "SELECT * FROM alirong_comments where id =?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s',$id);
$res = $stmt->execute();

if (!$res) {
  die('Error:' . $conn->error);
}
$res = $stmt->get_result();
$row =$res->fetch_assoc();
$username = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $user =getUserFromUsername($username);
  $nickname =$user['nickname'];
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>阿里蓉的留言板</title>
  <link rel="stylesheet" href="reset.css">
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header class="warming">
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任意真實帳號或密碼
  </header>
  <main class="board">
    <h2 class="board_title">編輯留言</h2>
    <?php
    if (!empty($_GET['errCode'])) {
      $code = $_GET['errCode'];
      if ($code === '1') {
        echo '<h2 class="remind">資料不齊全，麻煩填寫</h2>';
      }
      if ($code === '2') {
        echo '<h2 class="remind">無更改權限</h2>';
      }
    }
    if ($username) {
        echo '<form class="board_input-area" method="POST" action="handle_update_comment.php">
                <div class="input-area_comment ">
                  <textarea class="comment input" rows="5" name="comment">'. $row['comment'].'</textarea>
                </div>
                <input type="hidden" name="id" value="'. $row['id'].'">
                <input class="submit_btn btn" type="submit" value="送出">
              <form >';
      }
      ?>
  </main>
</body>
</html>
