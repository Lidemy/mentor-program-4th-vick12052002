<?php
require_once('conn.php');
session_start();
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
}
if (empty($_GET['id'])) {
  header("Location:index?errCode=1");
  die('資料讀取錯誤');
}
$id = $_GET['id'];
$sql = "SELECT * FROM alirong_post where post_id=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('i', $id);
$res = $stmt->execute();
if (!$res) {
  die($conn->error);
}
$res = $stmt->get_result();
$row = $res->fetch_assoc();
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
  <ul class="post_area page_area">
    <li class="post_card page_card ">
      <?php
      include_once('./template/post_list.php')
      ?>
    </li>
  </ul>
</main>
<?php
include_once('./template/footer.php')
?>