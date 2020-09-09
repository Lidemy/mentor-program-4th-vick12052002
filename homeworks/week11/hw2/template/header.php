<?php
require_once('conn.php');
require_once('utils.php');
$username = NULL;
$path = $_SERVER['PHP_SELF'];
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
}
$isSystem = false;
if(strpos($path,'system.php')){
  $isSystem = true;
}
?>

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>鹹酥雞聯盟</title>
  <link href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp" rel="stylesheet">
  <link rel="stylesheet" href="reset.css">
  <link rel="stylesheet" href="style.css">
  <script src="https://cdn.ckeditor.com/4.15.0/standard/ckeditor.js"></script>

</head>
<header>
  <div class="header_area">
    <div class="header_left">
      <div class="home"><a href="./index.php">鹹酥雞<span>聯盟</span></a></div>
      <ul class="navbar">
        <li><a href="list.php">文章列表</a></li>
        <li><a href="category.php">分類專區</a></li>
        <li><a href="about_me.php">關於我</a></li>
      </ul>
    </div>
    <div class="header_right btn_group">
      <?php
      if (!$username) { ?>
        <div class="login_btn btn"><a href="login.php">登入</a></div>
      <?php }
      else if ($isSystem) { ?>
        <div class="system_btn btn"><a href="add_post.php">新增文章</a></div>
        <div class="logout_btn btn"><a href="logout.php">登出</a></div>
      <?php }else{ ?>
        <div class="system_btn btn"><a href="system.php">管理後台</a></div>
        <div class="logout_btn btn"><a href="logout.php">登出</a></div>
         <?php }?>
    </div>
  </div>
</header>