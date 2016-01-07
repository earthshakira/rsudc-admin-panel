<?php
require_once("connection.php");
if(!isset($_GET["filter"])){
$sth = mysqli_query($conn,"SELECT * from studentswork order by id DESC");
}
else {
$sth = mysqli_query($conn,"SELECT * from studentswork where ".$_GET["filter"]." = ".$_GET["value"]."order by id DESC");
}
$rows = array();
while($r = mysqli_fetch_assoc($sth)) {
    $rows[] = $r;
}
echo json_encode($rows);

?>
