<?php
require_once('conn.php');
?>
<body>
  <?php
  include_once('./template/header.php')
  ?>
  <main>
    <div class="login_form">
      <h2 class="form_title">Log in</h2>
      <?php
      if(!empty($_GET['errCode'])){
        $code =$_GET['errCode'];
        if($code == 1){
          echo '<h2 class="warming">資料未填齊全<h2>';
        }
        if($code == 2){
          echo '<h2 class="warming">資料有誤，麻煩重填<h2>';
        }
      }
      ?>
      <form action="handle_login.php" method="POST" class="form_area">
        <div class="form_input">
          username：<br>
          <input type="text" name="username">
        </div>
        <div class="form_input">
          password：<br>
          <input type="password" name="password">
        </div>
        <input type="submit" value="submit" class=" submit_btn">
      </form>
    </div>
  </main>
  <?php
    include_once('./template/footer.php')
  ?>
</body>