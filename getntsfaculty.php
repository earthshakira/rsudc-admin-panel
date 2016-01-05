<?php
require_once("connection.php");
$sql = "SELECT * FROM ntsfacultyinfo order by id DESC";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
  // output data of each row
  $retarray = array();
  $objects=array();
  while($row = mysqli_fetch_assoc($result)) {
    $retarray["id"]=$row["id"];
    $retarray["name"]=$row["name"];
    array_push($objects,$retarray);
  }
}
deliver_response(200,'Okay',$objects);
function deliver_response($status,$status_message,$data){
  header("Content-Type:application/json");
  header("HTTP/1.1 ".$status." ".$status_message);
  $response["status"]=$status;
  $response["status_message"]=$status_message;
  $response["data"]=$data;
  $json_response=json_encode($data);
  echo $json_response;
}
 ?>
