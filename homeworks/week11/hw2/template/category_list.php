<ul class="posts_list hidden">
  <?php
  $data =  getTypeData($type);
  while ($dataItem = $data->fetch_assoc()) {
  ?>
    <li class="post_item ">
      <a href="page.php?id=<?php echo escape($dataItem['post_id']); ?>">
        <h3 class="post_title"><?php echo escape($dataItem['title']); ?></h3>
      </a>
    </li>
  <?php } ?>
</ul>