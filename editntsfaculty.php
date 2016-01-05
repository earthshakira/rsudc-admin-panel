<?php
require_once("connection.php");
$sql = "UPDATE ntsfacultyinfo set name='".$_GET["name"]."' where id='".$_GET["id"]."'";
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
