<?php
require_once('conn.php');
require_once('utils.php');

$page = 1;
if (!empty($_GET['page'])) {
  $page = intval($_GET['page']);
}
$item_per_page = 10;
$offset = ($page - 1) * $item_per_page;

$sql = 'SELECT * FROM alirong_users ORDER BY id ASC limit ? offset ?';
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $item_per_page, $offset);
$res = $stmt->execute();

if (!$res) {
  die('Error:' . $conn->error);
}
$res = $stmt->get_result();
$username = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $user = getUserFromUsername($username);
  $nickname = $user['nickname'];
  $authority = getIdentityAuthority($username);
  if($authority !== 2){
    header("Location:index.php");
    exit();
  }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>阿里蓉的留言板-管理系統</title>
  <link rel="stylesheet" href="reset.css">
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <header class="warming">
    注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任意真實帳號或密碼
  </header>
  <main class="users_info_area">
    <h2 class="board_title">管理系統</h2>
    <?php
    if (!empty($_GET['errCode'])) {
      $code = $_GET['errCode'];
      if ($code === '1') {
        echo '<h2 class="remind">權限更改失敗</h2>';
      }
    }
    if ($username) { ?>
      <div class="btn_group">
        <span class="back-home_btn btn"><a href="index.php">回留言板</a></span>
        <span class="logout_btn btn"><a href="logout.php">登出</a></span>
      </div>
    <?php }  ?>
    <div class="users_info">
      <table>
        <thead class="users_info_title">
          <tr >
          <th >id</th>
          <th>username</th>
          <th>nickname</th>
          <th>authority</th>
        </tr>
        </thead>
      <tbody class="users_info_body" >
        <?php
        while ($row = $res->fetch_assoc()) {
        ?>
          <tr>
            <td><?php echo escape($row['id']); ?></td>
            <td><?php echo escape($row['username']); ?></td>
            <td><?php echo escape($row['nickname']); ?></td>
            <td class="user_info-auth"><label for="authority">
                <?php
                if ($row['authority'] === 2) {
                  echo '管理員';
                }
                if ($row['authority'] === 1) {
                  echo '普通使用者';
                }
                if ($row['authority'] === 0) {
                  echo '已遭停權';
                } ?></label> <div class="setup_btn btn">設定</div>
              <form action="handle_authority.php" method="POST" class="change_auth hidden">
                <select name="authority" id="authority">
                  <option value="0">停權</option>
                  <option value="1" selected>正常使用者</option>
                  <option value="2">管理員</option>
                </select>
                <input type="hidden" name="id" value="<?php echo $row['id']; ?>">
                <input type="submit" name="" id="" class="submit btn">
              </form>
            </td>
          <?php } ?>
          </tr>
      </tbody>
    </table>
    </div>
    
    <div class="header_hr"></div>
    <div class="page_info">
      <?php
      $sql = 'select count(id) as count from alirong_users ';
      $stmt = $conn->prepare($sql);
      $res = $stmt->execute();

      if (!$res) {
        die('Error:' . $conn->error);
      }
      $res = $stmt->get_result();
      $row = $res->fetch_assoc();
      $count  = $row['count'];
      $total_page = ceil($count / $item_per_page);
      ?>
      <span>總共 <?php echo $row['count']; ?> 筆留言，</span>
      <span>頁數 <?php echo $page; ?> / <?php echo $total_page; ?></span>
    </div>
    <div class="paginator">
      <?php if ($page != 1) { ?>
        <a href="management_system.php?page=1">首頁</a>
        <a href="management_system.php?page=<?php echo $page - 1 ?>">上一頁</a>
      <?php } ?>
      <?php if ($page != $total_page) { ?>
        <a href="management_system.php?page=<?php echo $page + 1; ?>">下一頁</a>
        <a href="management_system.php?page=<?php echo $total_page; ?>">最末頁</a>
      <?php } ?>
    </div>
  </main>
</body>
<script>
  const userInfoTable = document.querySelector('.users_info')
  userInfoTable.addEventListener('click', (e) => {
    const target = e.target
    if (target.classList.contains('setup_btn')) {
      const form = target.closest('td').lastElementChild
      form.classList.toggle('hidden')

    }
  })
</script>

</html>