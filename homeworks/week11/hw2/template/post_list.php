
          <div class="cards_area_header">
            <h3 class="card_title"><a href="page.php?id=<?php escape($row['post_id'])?>"></a>
              <?php echo escape($row['title']) ?></h3>
            <div class=" card-info">
              <span class="icon_time"><img src="./img/watch-later.png" alt="" srcset=""></span>
              <span class="post_time">
                <?php
                if (empty($row['update_time'])) {
                  echo escape($row['created_time']);
                } else {
                  echo escape($row['update_time']);
                } ?>
              </span>
              <span class="icon_type"><img src="./img/folder.png" alt="" srcset=""></span>
              <span class="post_type">
                <div class="icon_folder"></div>
                <?php
                $option = [
                  1 => '北部',
                  2 => '中部',
                  3 => '南部',
                  4 => '東部 ',
                  5 => '離島'
                ];
                 $type = escape($row['type']);
                 echo $option[$type];
                ?>
              </span>
              <?php
                if(!empty($username)){
              ?>
              <div class="list_btn_group">
                <span class="edit_btn list_btn"><a href="update.php?id=<?php echo escape($row['post_id']); ?>">編輯</a></span>
                <span class="delete_btn list_btn"><a href="handle_delete.php?id=<?php echo escape($row['post_id']); ?>">刪除</a></span>
              </div>
                <?php } ?>
            </div>
          </div>
          <div class="card_content">
            <?php echo $row['content'];?>
          </div>