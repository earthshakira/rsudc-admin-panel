<?php

  function fileupload($path,$name){
    $fileName = $_FILES[$name]["name"]; // The file name
    $fileTmpLoc = $_FILES[$name]["tmp_name"]; // File in the PHP tmp folder
    $fileType = $_FILES[$name]["type"]; // The type of file it is
    $fileSize = $_FILES[$name]["size"]; // File size in bytes
    $fileErrorMsg = $_FILES[$name]["error"]; // 0 for false... and 1 for true
    if (!$fileTmpLoc) { // if file not chosen
        return array('status'=>false,'upload'=>false);
    }
    if(move_uploaded_file($fileTmpLoc, $path.$fileName)){
        return array('status'=>true,'upload'=>true);
    } else {
        return array('status'=>false,'upload'=>true);
    }
  }
 ?>
