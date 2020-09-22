<?php

function generateToken(){
  $s = '';
  for ($i = 1; $i <= 10; $i += 1) {
    $s .= chr(rand(65, 90));
  }
  return $s;
}
?>