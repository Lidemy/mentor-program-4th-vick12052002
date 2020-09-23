<?php
require_once('conn.php');
require_once('./utils.php');
session_start();
$username = NULL;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
}
include_once('./template/header.php');
?>
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
  if (empty($_GET['id'])) {
    header("Location:system.php?errCode=1");
    die("未取得資料");
  }
  if (!empty($_GET['err'])) {
    $code = $_GET['errCode'];
    if ($code == 1) {
      echo '<h2 class="warming">資料未填齊全<h2>';
    }
    if ($code == 2) {
      echo '<h2 class="warming">更新失敗<h2>';
    }
  }
  $id = $_GET['id'];
  $sql = "SELECT * FROM alirong_post where post_id=? AND username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('is', $id, $username);
  $res = $stmt->execute();

  if (!$res) {
    die($conn->error);
  }
  $res = $stmt->get_result();
  $row = $res->fetch_assoc();

  ?>
  <form action="handle_update_post.php" method="POST" class="post_form">
    <div class="form_input">
      <div class="input_error warming">請輸入文章標題</div>
      <input type="text" name="title" placeholder="請輸入文章標題" class="required" value="<?php echo escape($row['title']) ?>">
    </div>
    <div class="form_input">
      <div class="input_error warming">請選擇文章分類</div>
      <?php
      $type = escape($row['type']);
      ?>
      <select id="post_type" name="type" class="required">
        <?php
        $option = [
          1 => '<option value="1" >北部</option>',
          2 => '<option value="2" >中部</option>',
          3 => '<option value="3" >南部</option>',
          4 => '<option value="4" >東部</option> ',
          5 => '<option value="5" >離島</option>'
        ];
        $selectedOption = NULL;
        if ($type == 1) {
          $selectedOption = array_replace($option,array(1 => '<option value="1" selected>北部</option>'));
        }if ($type == 2) {
          $selectedOption = array_replace($option,array(2 => '<option value="2" selected>中部</option>'));
        }if ($type == 3) {
          $selectedOption = array_replace($option,array(3 =>'<option value="3" selected>南部</option>'));
        } if ($type == 4) {
          $selectedOption = array_replace($option,array(4 => '<option value="4" selected>東部</option>'));
        } if ($type == 5) {
          $selectedOption = array_replace($option,array(5 => '<option value="5" selected>離島</option>'));
        }
        $optionLength = count($selectedOption);
          for($i = 1;$i <= $optionLength; $i +=1){
          echo $selectedOption[$i] . '<br>';
          }
        ?>
      </select>
      <?php
      
      ?>
    </div>
    <div class="form_input">
      <div class="input_error warming">請輸入文章內容</div>
      <textarea name="content" id="content" cols="30" rows="10" placeholder="請輸入文章內容" class="required"><?php echo escape($row['content']); ?></textarea>
      <script>
        CKEDITOR.replace('content');
      </script>
    </div>
    <input type="hidden" name="id" value="<?php echo escape($id);?>">
    <input type="submit" value="submit" class="submit_btn" id="form_submit_btn">
  </form>
</div>
</main>
<script src="form.js"></script>
<?php
include_once('./template/footer.php')
?>