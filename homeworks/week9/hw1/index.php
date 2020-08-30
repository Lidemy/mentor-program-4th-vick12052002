<?php
require_once('conn.php');
require_once('utils.php');
$sql = "SELECT * FROM  alirong_comments order by created_time ASC";
$res = $conn->query($sql);
if (!$res) {
  die('Error:' . $conn->error);
}

$username = NULL;
if (!empty($_SESSION['username'])) {
  $username =$_SESSION['username'];
  $user = getUserFromUsername($username);  
  $nickname = $user['nickname'];
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
      <h2 class="board_title">留言板</h2>
      <?php
      if (!empty($_GET['errCode'])) {
        $code = $_GET['errCode'];
        if ($code === '1') {
          echo '<h2 class="remind">資料不齊全，麻煩填寫</h2>';
        }
      }
      if ($username) {
        echo '<h2 class="welcome">暱稱：  ' . $nickname . '</h2>
              <div class="btn_group">
              <div class="logout_btn btn"><a href="logout.php">登出</a></div>
              </div>';
      }else {
      echo '<div class="btn_group">
            <div class="login_btn btn"><a href="login.php">登入</a></div>
            <div class="register_btn btn"><a href="register.php">註冊</a></div>
            </div>';
      echo '<h2 class="remind">請先登入會員</h2>';
    }
    ?>
    <form class="board_input-area" method='POST' action="add_comment.php">
      <div class="input-area_comment ">
        <textarea class="comment" rows="5" name="comment"></textarea>
      </div>
      <?php
      if ($username) {
        echo '<input class="submit_btn btn" type="submit" value="送出">';
      }
      ?>
    </form>
    <div class="header_hr"></div>
    <div class="board_body">
      <?php for ($i = 0; $i < $res->num_rows; $i += 1) {
        $row = $res->fetch_assoc(); ?>
        <div class="card">
          <div class="card_ph"></div>
          <div class="card_info-area">
            <div class="card_info-user">
              <div class="card_info_name"> <?php echo $row['username']; ?></div>
              <div class="card_info_time"> <?php echo $row['created_time']; ?></div>
            </div>
            <div class="card_comment"><?php echo $row['comment']; ?></div>
          </div>
        </div>
      <?php } ?>

    </div>

    </main>
  </body>

  </html>