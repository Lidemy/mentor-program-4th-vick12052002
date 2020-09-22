<?php
require_once('conn.php');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

if(empty($_POST['content'])||
  empty($_POST['nickname'])||
  empty($_POST['site_key'])){
  $json = array(
    "ok" => false,
    "message" => "Please input content"
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$nickname=$_POST['nickname'];
$content=$_POST['content'];
$site_key=$_POST['site_key'];

$sql = "INSERT INTO alirong_discussions (site_key, nickname, content) VALUES (?,?,?) ";
$stmt = $conn->prepare($sql);
$stmt ->bind_param('sss', $site_key, $nickname, $content);
$res = $stmt->execute();

if(!$res){
  $json = array(
    "ok" => false,
    "message" => $conn->error
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$sql = "SELECT * FROM alirong_discussions order by id DESC limit 1 ";
$stmt = $conn->prepare($sql);
$res = $stmt->execute();

if(!$res){
  $json = array(
    "ok" => false,
    "message" => '讀取最新資料失敗' . $conn->error
  );
  $response = json_encode($json);
  echo $response;
  die();
}
$res = $stmt->get_result();
$row = $res->fetch_assoc(); 
$json =array(
  "ok" => true,
  "discussions" => $row
);
$response = json_encode($json);
echo $response;

?>