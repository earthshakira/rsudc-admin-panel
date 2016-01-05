<?php
require_once("connection.php");
if(!isset($_GET["id"])){
  $response['message']="id required";
  $response['staus']=false;
  die(json_encode($response));
}
if(isset($_GET["name"]))
{$sql = "UPDATE imagegallery set name='".$_GET["name"]."' where id='".$_GET["id"]."'";
if ($conn->query($sql) === TRUE) {
    $response['status']=true;
    $response['message']="name sqldone";
} else {
    $response['message']=$sql."-".$conn->error;
    $response['staus']=false;
    die(json_encode($response));
}}
if(isset($_GET["visible"]))
{
$sql = "UPDATE imagegallery set visible='".$_GET["visible"]."' where id='".$_GET["id"]."'";
if ($conn->query($sql) === TRUE) {
    $response['status']=true;
    $response['message']="name sqldone";
} else {
    $response['message']=$sql."-".$conn->error;
    $response['staus']=false;
    die(json_encode($response));
}
}
if(isset($_GET["count"]))
{$sql = "UPDATE imagegallery set count='".$_GET["count"]."' where id='".$_GET["id"]."'";
if ($conn->query($sql) === TRUE) {
    $response['status']=true;
    $response['message']="name sqldone";
} else {
    $response['message']=$sql."-".$conn->error;
    $response['staus']=false;
    die(json_encode($response));
}
}if(isset($_GET["thumbnail"]))
{$sql = "UPDATE imagegallery set thumbnail='".$_GET["thumbnail"]."' where id='".$_GET["id"]."'";
if ($conn->query($sql) === TRUE) {
    $response['status']=true;
    $response['message']="name sqldone";
} else {
    $response['message']=$sql."-".$conn->error;
    $response['staus']=false;
    die(json_encode($response));
}
}echo json_encode($response);

?>
