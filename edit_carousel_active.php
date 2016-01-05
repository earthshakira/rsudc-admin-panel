<?php
require_once("connection.php");
$response = array('status' => true,'message'=>"" );
if ($conn->connect_error) {
    $response['message']=$conn->connect_error;
    $response['status']=false;
    $response['position']="server connection";
    die(json_encode($response));
}
$postid=$_POST["postid"];
if(isset($_FILES["file"]))
{
    $fileName = $_FILES["file"]["name"]; // The file name
    $fileTmpLoc = $_FILES["file"]["tmp_name"]; // File in the PHP tmp folder
    $fileType = $_FILES["file"]["type"]; // The type of file it is
    $fileSize = $_FILES["file"]["size"]; // File size in bytes
    $fileErrorMsg = $_FILES["file"]["error"]; // 0 for false... and 1 for true
    $path=$_POST["path"];
    $ext = end((explode(".", $fileName)));
    if($ext){
        $image=$path.generateRandomString(50).".".$ext;
    }
    else {
      $image=$path.generateRandomString(50);
    }
    if(move_uploaded_file($fileTmpLoc,$image)){
        $response['message']="$fileName upload is complete";
    } else {
      $response['message']="move_uploaded_file function failed";
      $response['status']=false;
      $response['position']="filetransfer";
      die(json_encode($response));
    }
    $sql = "UPDATE activefrontcarousel SET image=\"$image\" where id=$postid";
    if ($conn->query($sql) === TRUE) {
        $response['message']="sqldone";
    } else {
        $response['message']=$sql."|".$conn->error;
        $response['status']=false;
        $response['position']="image path sql";
        die(json_encode($response));
    }
}
    $posttitle=$_POST["title"];
    if(isset($posttitle)){

      $sql = "UPDATE activefrontcarousel SET title=\"".$posttitle."\" where id=$postid";
      if ($conn->query($sql) === TRUE) {
          $response['message']="title sqldone";
      } else {
          $response['message']=$sql."|".$conn->error;
          $response['status']=false;
          $response['position']="title sql";
          die(json_encode($response));
      }
    }

    if(isset($_POST["caption"])){
      $sql = "UPDATE activefrontcarousel SET caption=\"".$_POST["caption"]."\" where id=$postid";
      if ($conn->query($sql) === TRUE) {
          $response['message']="sqldone";
      } else {
          $response['message']=$sql."|".$conn->error;
          $response['status']=false;
          $response['position']="caption sql";
          die(json_encode($response));
      }
    }

    echo json_encode($response);
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

?>
