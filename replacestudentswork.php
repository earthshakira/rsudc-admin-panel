<?php
$id=$_GET["id"];
require_once("connection.php");
$sql = "select * from studentswork where id='".$id."'";
$sth = mysqli_query($conn,$sql);
$rows = array();
while($r = mysqli_fetch_assoc($sth)) {
  unlink($r["file"]);
}
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
$image=$path.generateRandomString(50).".".$ext;
$sql = "UPDATE  studentswork SET file='".$image."' where id=".$id;
if ($conn->query($sql) === TRUE) {
    $response['message']="sqldone";
} else {
    $response['message']=$sql."-".$conn->error;
    $response['staus']=false;
    die(json_encode($response));
}
if(move_uploaded_file($fileTmpLoc,$image)){
    $response['message']="$fileName upload is complete";
} else {
  $response['message']="move_uploaded_file function failed";
  $response['staus']=false;
}
echo json_encode($response);

?>
