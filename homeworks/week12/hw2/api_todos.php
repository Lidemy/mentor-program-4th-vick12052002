<?php
require_once('conn.php');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

if (empty($_GET['id'])) {
  $json = array(
    "ok" => false,
    "message" => "無傳入 id "
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$token_id = $_GET['id'];

$sql = "SELECT  content FROM alirong_todos where token_id=? " ;
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $_GET['id']);
$res = $stmt->execute();

if (!$res) {
  $json = array(
    "ok" => false,
    "message" => $conn->error
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$res = $stmt->get_result();
$discussions = array();

while ($row = $res->fetch_assoc()) {
  array_push($discussions, array(
    "content" => $row['content'],
  ));
}

$json = array(
  "ok" => true,
  "discussions" => $discussions
);
$response = json_encode($json);
echo $response;

?>