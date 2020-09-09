<?php
require_once('conn.php');
session_start();
include_once('./template/header.php');
$username = NULL;
require_once('check_permission.php');
$username = $_SESSION['username'];
?>
<main>
  <div class="banner">
    <div class="banner_img"></div>
    <div class="blog_info">
      <h2 class="blog_title">鹹酥雞聯盟</h2>
      <p class="blog_welcome">台灣美食應有盡有，凡舉「大腸包小腸、肉圓、豬血糕」等等，說到宵夜的選項更是不勝枚舉，而「 鹹酥雞 」則是大人小孩都喜愛的台灣美食，這個部落格是記錄全台各地的鹹酥雞</p>
    </div>
  </div>
  <div class="post_form_area">
    <h2 class="form_title">發表文章：</h2>
    <?php
    if (!empty($_GET['errCode'])) {
      $code = $_GET['errCode'];
      if ($code == 1) {
        echo '<h2 class="warming">資料未填齊全<h2>';
      }
      if ($code == 2) {
        echo '<h2 class="warming">新增失敗<h2>';
      }
    }
    ?>
    <form action="handle_add_post.php" method="POST" class="post_form">
      <div class="form_input">
        <div class="input_error warming">請輸入文章標題</div>
        <input type="text" name="title" placeholder="請輸入文章標題" class="required">
      </div>
      <div class="form_input">
        <div class="input_error warming">請選擇文章分類</div>
        <select id="post_type" name="type" class="required">
          <option value="" class="default_option" selected>請選擇文章分類</option>
          <option value="1">北部</option>
          <option value="2">中部</option>
          <option value="3">南部</option>
          <option value="4">東部</option>
          <option value="5">離島</option>
        </select>
      </div>
      <div class="form_input">
        <div class="input_error warming">請輸入文章內容</div>
        <textarea name="content" id="content" cols="30" rows="10" placeholder="請輸入文章內容" class="required textarea"></textarea>
        <script>
          CKEDITOR.replace('content');
        </script>
      </div>
      <input type="submit" value="submit" class="submit_btn" id="form_submit_btn">
    </form>
  </div>

</main>
<script src="form.js"></script>
<?php
include_once('./template/footer.php')
?>