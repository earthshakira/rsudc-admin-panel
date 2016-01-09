<?php 
	session_start();
	require_once("connection.php");
	if(!isset($_GET["user"])&&!isset($_GET["pass"])){
		die("{\"status\":false}");
	}
	$user=$_GET["user"];
	$pass=$_GET["pass"];
	$sql="select *from login where name='$user' and pass='$pass' ";
	$sth = mysqli_query($conn,$sql);
	if(mysqli_fetch_assoc($sth))
	{
		$_SESSION["user"]=$user;
		$_SESSION["pass"]=$pass;
		echo "{\"status\":true}";
	}else {
		echo "{\"status\":false}";
	}	

?>