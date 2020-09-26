<?php
require_once('conn.php');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

if (empty($_GET['site_key'])) {
  $json = array(
    "ok" => false,
    "message" => "Please add site_key in url"
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$site_key = $_GET['site_key'];

$sql = "SELECT id, nickname, content, created_time FROM alirong_discussions where site_key=? " .
      (empty($_GET['before']) ? "" : "and id < ?") .
      " ORDER BY id DESC limit 5 ";
$stmt = $conn->prepare($sql);
if (empty($_GET['before'])) {
  $stmt->bind_param('s', $site_key);
} else {
  $stmt->bind_param('si', $site_key, $_GET['before']);
}
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
    "id" => $row['id'],
    "nickname" => $row['nickname'],
    "content" => $row['content'],
    "created_time" => $row['created_time']
  ));
}

$json = array(
  "ok" => true,
  "discussions" => $discussions
);
$response = json_encode($json);
echo $response;
