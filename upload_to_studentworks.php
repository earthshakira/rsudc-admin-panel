<?php
require_once("connection.php");
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
$image=$path.generateRandomString(150).".".$ext;
$sql = "INSERT INTO  studentswork(file,title,year,sem) VALUES ('".$image."','".$_POST["title"]."',' ".$_POST["year"]."','".$_POST["sem"]."')";
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
