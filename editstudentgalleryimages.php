<?php
require_once("connection.php");
if(isset($_GET["title"])){
  $sql = "UPDATE imagegalleryimages set title='".$_GET["title"]."' where id='".$_GET["id"]."'";
  if ($conn->query($sql) === TRUE) {
      $response['status']=true;
      $response['message']="title done";
  } else {
      $response['message']=$sql."-".$conn->error;
      $response['staus']=false;
      die(json_encode($response));
  }
}

if(isset($_GET["caption"])){
  $sql = "UPDATE imagegalleryimages set caption='".$_GET["caption"]."' where id='".$_GET["id"]."'";
  if ($conn->query($sql) === TRUE) {
      $response['status']=true;
      $response['message']="caption done";
  } else {
      $response['message']=$sql."-".$conn->error;
      $response['staus']=false;
      die(json_encode($response));
  }
}
echo json_encode($response);

?>
