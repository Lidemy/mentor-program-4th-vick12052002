<?php
require_once('conn.php');
$sql = "SELECT * FROM  alirong_comments order by created_time ASC";
$res = $conn->query($sql);
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
    <h2 class="board_title">留言板</h2>
    <?php
    if (!empty($_GET['errCode'])) {
      $code = $_GET['errCode'];
      if ($code === '1') {
        echo '<h2 class="remind">資料不齊全，麻煩填寫</h2>';
      }
      if ($code === '2') {
        echo '<h2 class="remind">帳號或密碼錯誤</h2>';
      }
    }
    ?>
    <div class="btn_group">
      <div class="register_btn btn"><a href="register.php">註冊</a></div>
      <div class="back-home_btn btn"><a href="index.php">回留言板</a></div>
    </div>
    <form class="board_input-area" method='POST' action="handle_login.php">
      <div class="input-area_username input-area">
        帳號：<input type="text" name='username'>
      </div>
      <div class="input-area_password input-area">
        密碼：<input type="password" name='password'>
      </div>
      
      <input class="submit_btn btn" type="submit" value="送出">
    </form>
    <div class="header_hr"></div>

  </main>
</body>

</html>