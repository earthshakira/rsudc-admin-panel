<?php
require_once("connection.php");
$sth = mysqli_query($conn,"SELECT * from imagegalleryimages where galleryid='".$_GET["id"]."' order by id DESC");
//echo "SELECT * from imagegalleryimages where galleryid='".$_GET["id"]."' order by id DESC";
$rows = array();
while($r = mysqli_fetch_assoc($sth)) {
    $rows[] = $r;
}
echo json_encode($rows);

?>
