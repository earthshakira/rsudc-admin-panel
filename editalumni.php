<?php
require_once("connection.php");
$response = array('status' => true,'message'=>"" );
if ($conn->connect_error) {
    $response['message']=$conn->connect_error;
    $response['status']=false;
    $response['position']="server connection";
    die(json_encode($response));
}
$postid=$_POST["id"];
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
    $sql = "UPDATE alumni SET image=\"$image\" where id=$postid";
    if ($conn->query($sql) === TRUE) {
        $response['message']="sqldone";
    } else {
        $response['message']=$sql."|".$conn->error;
        $response['status']=false;
        $response['position']="image path sql";
        die(json_encode($response));
    }
}
    if(isset($_POST["name"])){
      $sql = "UPDATE alumni SET name=\"".$_POST["name"]."\" where id=$postid";
      if ($conn->query($sql) === TRUE) {
          $response['message']="name sqldone";
      } else {
          $response['message']=$sql."|".$conn->error;
          $response['status']=false;
          $response['position']="name sql";
          die(json_encode($response));
      }
    }

    if(isset($_POST["designation"])){
      $sql = "UPDATE alumni SET designation=\"".$_POST["designation"]."\" where id=$postid";
      if ($conn->query($sql) === TRUE) {
          $response['message']="sqldone";
      } else {
          $response['message']=$sql."|".$conn->error;
          $response['status']=false;
          $response['position']="designation sql";
          die(json_encode($response));
      }
    }

    if(isset($_POST["description"])){
      $sql = "UPDATE alumni SET quote=\"".$_POST["description"]."\" where id=$postid";
      if ($conn->query($sql) === TRUE) {
          $response['message']="sqldone";
      } else {
          $response['message']=$sql."|".$conn->error;
          $response['status']=false;
          $response['position']="description sql";
          die(json_encode($response));
      }
    }

    if(isset($_POST["contact"])){
      $sql = "UPDATE alumni SET contact=\"".$_POST["contact"]."\" where id=$postid";
      if ($conn->query($sql) === TRUE) {
          $response['message']="sqldone";
      } else {
          $response['message']=$sql."|".$conn->error;
          $response['status']=false;
          $response['position']="description sql";
          die(json_encode($response));
      }
    }

    if(isset($_POST["year"])){
      $sql = "UPDATE alumni SET year=\"".$_POST["year"]."\" where id=$postid";
      if ($conn->query($sql) === TRUE) {
          $response['message']="sqldone";
      } else {
          $response['message']=$sql."|".$conn->error;
          $response['status']=false;
          $response['position']="description sql";
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
