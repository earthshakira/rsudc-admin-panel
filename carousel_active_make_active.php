<?php
require_once("connection.php");
$delid=$_GET["id"];
$sql = "SELECT * FROM frontcarouselgallery where ID=$delid";
$result = mysqli_query($conn, $sql);
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $image=$row["Image"];
        $id=$row["ID"];
        $title=$row["Title"];
        $caption=$row["Caption"];
        $sql = "INSERT into activefrontcarousel VALUES ($id,\"$image\",\"$title\",\"$caption\")";
        $result2 = mysqli_query($conn, $sql);
        //echo json_encode($result2);
        $sql = "DELETE FROM frontcarouselgallery where id=$id";
        $result2 = mysqli_query($conn, $sql);
        //echo json_encode($result2);
          $res["status"]=true;
          $res["message"]="Entry Done";
    }
} else {
  $res["status"]=false;
  $res["message"]="No Entry in Table";
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
