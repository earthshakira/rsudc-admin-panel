<?php
require_once("connection.php");

$sql = "select * from imagegalleryimages where id='".$_GET["id"]."'";
$sth = mysqli_query($conn,$sql);
$rows = array();

$sql = "DELETE from imagegalleryimages where id='".$_GET["id"]."'";
if ($conn->query($sql) === TRUE) {
    $response['status']=true;
    $response['message']="sqldone";
} else {
    $response['message']=$sql."-".$conn->error;
    $response['staus']=false;
    die(json_encode($response));
}

while($r = mysqli_fetch_assoc($sth)) {
  if(file_exists($r["file"]))
  unlink($r["path"]);
}
echo json_encode($response);

?>
