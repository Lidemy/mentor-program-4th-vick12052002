<?php
require_once('conn.php');
require_once('./utils.php');
session_start();
$username = NULL;
require_once('check_permission.php');
$username = $_SESSION['username'];
$res = getPostData($username);
?>
<?php
include_once('./template/header.php');
?>
<main>
  <div class="banner">
    <div class="banner_img"></div>
    <div class="blog_info">
      <h2 class="blog_title">鹹酥雞聯盟-後台</h2>
      <p class="blog_welcome">台灣美食應有盡有，凡舉「大腸包小腸、肉圓、豬血糕」等等，說到宵夜的選項更是不勝枚舉，而「 鹹酥雞 」則是大人小孩都喜愛的台灣美食，這個部落格是記錄全台各地的鹹酥雞</p>
    </div>
  </div>

  <div class="post_list_area">
    <?php
    if (!empty($_GET['errCode'])) {
      $code = $_GET['errCode'];
      if ($code == 1) {
        echo '<h2 class="warming">未成功讀取資料<h2>';
      }
      if ($code == 2) {
        echo '<h2 class="warming">處理失敗<h2>';
      }
    }
    ?>
    <ul class="post_list">
      <?php
      while ($row = $res->fetch_assoc()) {
      ?>
        <li class="post_item">
          <h3 class="post_title"><?php echo escape($row['title']) ?> 
          </h3>
          <div class="post_info">
            <span class="post_time"><?php 
            if(empty($row['update_time'])){
              echo escape($row['created_time']);
            }else{
              echo escape($row['update_time']);
            }?>
              </span>
            <div class="list_btn_group">
              <span class="edit_btn list_btn"><a href="update.php?id=<?php echo escape($row['post_id']); ?>">編輯</a></span>
              <span class="delete_btn list_btn"><a href="handle_delete.php?id=<?php echo escape($row['post_id']); ?>">刪除</a></span>
            </div>
          </div>
        <?php } ?>
        </li>
    </ul>
  </div>
</main>

<?php
include_once('./template/footer.php')
?>