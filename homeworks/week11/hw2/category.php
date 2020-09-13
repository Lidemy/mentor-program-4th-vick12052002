<?php
require_once('conn.php');
require_once('utils.php');
session_start();
$sql = "SELECT * FROM alirong_category  WHERE is_deleted IS NULL ORDER BY `type` ASC";
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
  <h2 class="category_title">文章分類</h2>
  <div>
    <ul class="type_list">
      <?php
      while ($row = $res->fetch_assoc()) {
        $type = escape($row['type']);
        $name = escape($row['name']);
        echo '<li class="type_item"><h2 class="type_title">' . $name . '</h2>';
        include('./template/category_list.php');
        echo '</li>';
      }
      ?>
    </ul>
  </div>
</main>
<?php
include_once('./template/footer.php');
?>
<script>
  document.querySelector('.type_list').addEventListener('click', (e) => {
    const element = e.target.closest('.type_item');
    if (element.childNodes[1]) {
      element.childNodes[1].classList.toggle('hidden')
    }
  })
</script>