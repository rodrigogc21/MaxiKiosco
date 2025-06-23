<?php
$servername = "127.0.0.1";
$port = 3307;
$username = "root";
$password = "Aristea123?";
$dbname = "maxikiosco_bd";

$conn = new mysqli($servername, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
