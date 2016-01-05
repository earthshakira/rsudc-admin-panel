<?php
require_once("connection.php");
$sql = "UPDATE imagegallery set thumbnail='".$_GET["path"]."' where id='".$_GET["id"]."'";
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
