<?php
require_once("connection.php");
require("functions.php");
$fileName = $_FILES["file"]["name"]; // The file name
$fileTmpLoc = $_FILES["file"]["tmp_name"]; // File in the PHP tmp folder
$fileType = $_FILES["file"]["type"]; // The type of file it is
$fileSize = $_FILES["file"]["size"]; // File size in bytes
$fileErrorMsg = $_FILES["file"]["error"]; // 0 for false... and 1 for true
$path=$_POST["path"];
$response = array('status' => true,'message'=>"" );
if ($conn->connect_error) {
    $response['message']=$conn->connect_error;
    $response['staus']=false;
    die(json_encode($response));
}

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

$ext = end((explode(".", $fileName)));
$filename=generateRandomString(150);
$image=$path.$filename.".png";
$sql = "INSERT INTO  facultyinfo(image,name,designation,description,type) VALUES ('".$image."','".$_POST["name"]."',' ".$_POST["designation"]."','".$_POST["description"]."','".$_POST["type"]."')";
if ($conn->query($sql) === TRUE) {
    $response['message']="sqldone";
} else {
    $response['message']=$sql."-".$conn->error;
    $response['staus']=false;
    die(json_encode($response));
}
$scratchpath="../images/scratch/".$filename.".".$ext;
if(move_uploaded_file($fileTmpLoc,$scratchpath)){
    $response['message']="$fileName upload is complete";
} else {
  $response['message']="move_uploaded_file function failed";
  $response['staus']=false;
}

create_thumbnail($scratchpath,$image,180,180);
create_thumbnail($scratchpath,"../images/full/".$filename.".png",0,0);
create_thumbnail($scratchpath,"../images/medium/".$filename.".png",450,0);
create_thumbnail($scratchpath,"../images/thumb/".$filename.".png",180,180);

unlink($scratchpath);
echo json_encode($response);

?>
