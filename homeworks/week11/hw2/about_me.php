<?php
require_once('conn.php');
session_start();
include_once('./template/header.php');
?>

<main>
<div class="banner">
      <div class="banner_img"></div>
      <div class="blog_info"><h2 class="blog_title">鹹酥雞聯盟</h2>
      <p class="blog_welcome">台灣美食應有盡有，凡舉「大腸包小腸、肉圓、豬血糕」等等，說到宵夜的選項更是不勝枚舉，而「 鹹酥雞 」則是大人小孩都喜愛的台灣美食，這個部落格是記錄全台各地的鹹酥雞</p></div>
    </div>
  <div class="about_me-area">
    <h2 class="about_me-title">關於我</h2>
    <p class="about_me-desc">
      土生土長的台灣仔，熱愛吃鹹酥雞，夢想為吃遍全台灣的鹹酥雞，並推廣給全世界的人知道鹹酥雞的美味
    </p>
  </div>

</main>
<?php
  include_once('./template/footer.php');
?>