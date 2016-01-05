<?php
require_once("connection.php");
$delid=$_GET["id"];
$sql = "SELECT * FROM frontcarouselgallery where ID=$delid";
$result = mysqli_query($conn, $sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $image=$row["Image"];
        $removed=(unlink($image));
        if(!$removed){
          $res["status"]=false;
          $res["message"]="Delete Unsucessful";
          deliver_response(200,'Okay',$res);
          $res=array();
          if ($conn->query($sql) === TRUE) {
              $res["status"]=true;
              $res["message"]="okay";
          } else {
            $res["status"]=false;
            $res["message"]=$conn->error;
          }
          die();
        }
    }
} else {
  $res["status"]=false;
  $res["message"]="No File Present";
  deliver_response(200,'Okay',$res);
  die();
}

$sql = "DELETE FROM frontcarouselgallery where ID = $delid";
$result = mysqli_query($conn, $sql);
$res=array();
if ($conn->query($sql) === TRUE) {
    $res["status"]=true;
    $res["message"]="okay";
} else {
  $res["status"]=false;
  $res["message"]=$conn->error;
}
deliver_response(200,'Okay',$res);
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
