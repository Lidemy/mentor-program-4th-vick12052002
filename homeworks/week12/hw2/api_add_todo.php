<?php
require_once('conn.php');
require_once('utils.php');

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

if(empty($_POST['content'])){
  $json = array(
    "ok" => false,
    "message" => "Please input content"
  );
  $response = json_encode($json);
  echo $response;
  die();
}
$content = $_POST['content'];

if(!empty($_GET['id'])){
  $sql = "UPDATE  alirong_todos SET content=? where token_id=? ";
  $stmt = $conn->prepare($sql);
  $stmt ->bind_param('ss', $content,$_GET['id']);
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
  $json = array(
    "ok" => true,
    "message" => "更新資料成功",
    "token_id"=> $_GET['id']
  );
  $response = json_encode($json);
  echo $response;
}else{
  $token_id = generateToken();
  $sql = "INSERT INTO alirong_todos (content,token_id) VALUES (?,?) ";
  $stmt = $conn->prepare($sql);
  $stmt ->bind_param('ss', $content,$token_id);
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
  
  $json = array(
    "ok" => true,
    "message" => "成功新增 token_id 為" . $token_id ,
    "token_id"=> $token_id
  );
  $response = json_encode($json);
  echo $response;
}

?>