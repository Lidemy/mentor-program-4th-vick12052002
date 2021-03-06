<?php
require_once('conn.php');
$sql = "SELECT * FROM alirong_post  WHERE is_delete IS NULL ORDER BY `post_id` DESC";
$stmt = $conn->prepare($sql);
$res = $stmt->execute();

if (!$res) {
  die($conn->error);
}
$res = $stmt->get_result();
?>
<?php
include_once('./template/header.php');
?>
<main>
  <div class="banner">
    <div class="banner_img"></div>
    <div class="blog_info">
      <h2 class="blog_title">鹹酥雞聯盟</h2>
      <p class="blog_welcome">台灣美食應有盡有，凡舉「大腸包小腸、肉圓、豬血糕」等等，說到宵夜的選項更是不勝枚舉，而「 鹹酥雞 」則是大人小孩都喜愛的台灣美食，這個部落格是記錄全台各地的鹹酥雞</p>
    </div>
  </div>
  <div class="list_area">
    <ul class="post_area">
      <?php
      while ($row = $res->fetch_assoc()) {
      ?>
        <li class="post_item ">
          <h3 class="post_title list_item_title"><a href="page.php?id=<?php echo escape($row['post_id']);  ?>"><?php echo escape($row['title']); ?></a></h3>
          <div class="post_info">
            <span class="post_time">
            <?php
            if (empty($row['update_time'])) {
              echo escape($row['created_time']);
            } else {
              echo escape($row['update_time']);
            }
          } ?>
            </span>
          </div>
        </li>
    </ul>
  </div>

</main>

<?php
include_once('./template/footer.php')
?>