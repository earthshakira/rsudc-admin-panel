<?php
$servername = "localhost";
$username = "coolio";
$password = "coolio";
$db="rsudc_demo";
// Create connection
$conn = new mysqli($servername, $username, $password,$db);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
