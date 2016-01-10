<?php
$id=$_GET["id"];
require_once("connection.php");
$sql = "select * from studentswork where id='".$id."'";
$sth = mysqli_query($conn,$sql);
$rows = array();
$sql = "DELETE from studentswork where id='".$id."'";
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
  unlink($r["file"]);
}
echo json_encode($response);

?>
