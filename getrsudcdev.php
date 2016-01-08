<?php
require_once("connection.php");
$sth = mysqli_query($conn,"SELECT * from rsudcdev order by id DESC");
$rows = array();
while($r = mysqli_fetch_assoc($sth)) {
    $rows[] = $r;
}
echo json_encode($rows);

?>
