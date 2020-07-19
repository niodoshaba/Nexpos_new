<?php
$dsn = "mysql:host=localhost;port=3306;dbname=ed101g4;charset=utf8";
	$user = "ed101g4";
	$password = "ed101g4";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    $pdo = new PDO( $dsn, $user, $password, $options); 
?>