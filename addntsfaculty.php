<?php
require_once("connection.php");
$sql = "INSERT INTO  ntsfacultyinfo(name)  VALUES ('".$_GET["name"]."')";
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
