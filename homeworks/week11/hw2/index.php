<?php
require_once('conn.php');
session_start();
$limit = 5;
$sql = "SELECT * FROM alirong_post  WHERE is_delete IS NULL ORDER BY `post_id` DESC limit ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i',$limit);
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
  <div >
    <ul class="post_area">
      <?php
        while ($row = $res->fetch_assoc()) {
      ?>
        <li class="post_card ">
         <?php 
         include('./template/post_list.php')
         ?>
          <span class="more_btn list_btn"><a href="page.php?id=<?php echo escape($row['post_id']); ?>">view more</a></span>
        </li>
        <?php } ?>
    </ul>
  </div>

</main>

<?php
include_once('./template/footer.php')
?>