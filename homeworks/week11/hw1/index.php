<?php
require_once('conn.php');
require_once('utils.php');
$page = 1;
if(!empty($_GET['page'])){
  $page=intval($_GET['page']);
}
$item_per_page = 5;
$offset = ($page - 1) * $item_per_page;

$sql = 'select
C.id as id, C.comment as comment,
C.created_time as created_time, U.nickname as nickname, U.username as username ,
U.authority as authority from alirong_comments as C 
left join alirong_users as U on C.username = U.username 
where C.is_deleted IS NUll
order by C.id desc limit ? offset ?';

$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $item_per_page, $offset);
$res = $stmt->execute();

if (!$res) {
  die('Error:' . $conn->error);
}
$res = $stmt->get_result();
$username = NULL;
$authority = NUll;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  $authority = getIdentityAuthority($username);
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
    if ($username) { ?>
      <h2 class="welcome">你好！<?php echo escape($nickname);
      if($authority === 0){
        echo "<script>alert('您已遭停權，僅能編輯留言與刪除')</script>";
      } ?></h2>
      <div class="btn_group">
        <span class="update_btn  btn">編輯暱稱</span>
        <span class="logout_btn btn"><a href="logout.php">登出</a></span>
        <?php if($authority === 2){?>
        <span class="admin_btn btn"><a href="management_system.php">後台</a></span>
        <?php } ?>
      </div>
      <form method="POST" action="update_user.php" class="update-user_form">
        <div class="input-area">
          新的暱稱為：<input type="text" name="nickname" class="input">
          <input type="submit" value="確定" class="btn submit_btn update-submit_btn ">
        </div>
      </form>
    <?php } else { ?>
      <div class="btn_group">
        <div class="login_btn btn"><a href="login.php">登入</a></div>
        <div class="register_btn btn"><a href="register.php">註冊</a></div>
      </div>
      <h2 class="remind">請先登入會員</h2>
    <?php } ?>
    <form class="board_input-area" method='POST' action="add_comment.php">
      <div class="input-area_comment ">
        <textarea class="comment input" rows="5" name="comment"></textarea>
      </div>
      <?php
      if ($username && $authority!== 0) {
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
              <div class="card_info_name">
                <?php echo escape($row['nickname']) . "(@" . escape($row['username']) . ")"; ?></div>
              <div class="card_info_time"> <?php echo escape($row['created_time']); ?>
                <?php
                if ($username === $row['username']|| $authority===2) {
                ?>
                  <span class="">
                    <a href="update_comment.php?id=<?php echo $row['id'] ?>">編輯</a>
                    <a href="handle_delete_comment.php?id=<?php echo $row['id'] ?>">刪除</a>
                  <?php } ?>
              </div>
            </div>
            <div class="card_comment"><?php echo escape($row['comment']); ?></div>
          </div>
        </div>
      <?php } ?>
    </div>
    <div class="header_hr"></div>
    <div class="page_info">
      <?php
      $sql = 'select count(id) as count 
              from alirong_comments where is_deleted IS NUll';
      $stmt = $conn->prepare($sql);
      $res = $stmt->execute();

      if (!$res) {
        die('Error:' . $conn->error);
      }
      $res = $stmt->get_result(); 
      $row = $res ->fetch_assoc();
      $count = $row['count'];
      $total_page = ceil($count / $item_per_page);
      ?>
        <span>總共 <?php echo $row['count']; ?> 筆留言，</span>
        <span>頁數 <?php echo $page ;?> / <?php echo $total_page; ?></span>
    </div>
    <div class="paginator">
      <?php if ($page !== 1){ ?>
        <a href="index.php?page=1">首頁</a>
        <a href="index.php?page=<?php echo $page - 1?>">上一頁</a>
      <?php } ?>
      <?php if ($page !== $total_page ){ ?>
        <a href="index.php?page=<?php echo $page + 1; ?>">下一頁</a>
        <a href="index.php?page=<?php echo $total_page;?>">最末頁</a>
      <?php } ?>

    </div>
  </main>
</body>
<script>
  const updateBtn = document.querySelector('.update_btn');
  updateBtn.addEventListener('click', (e) => {
    const update_form = document.querySelector('.update-user_form');
    update_form.classList.toggle('show');
  })
</script>

</html>