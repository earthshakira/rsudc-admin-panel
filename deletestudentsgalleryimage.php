<?php
require_once("connection.php");

$sql = "select * from imagegalleryimages where id='".$_GET["id"]."'";
$sth = mysqli_query($conn,$sql);
$rows = array();
while($r = mysqli_fetch_assoc($sth)) {
  unlink($r["path"]);
}
$sql = "DELETE from imagegalleryimages where id='".$_GET["id"]."'";
if ($conn->query($sql) === TRUE) {
    $response['status']=true;
    $response['message']="sqldone";
} else {
    $response['message']=$sql."-".$conn->error;
    $response['staus']=false;
    die(json_encode($response));
}
echo json_encode($response);

?>
