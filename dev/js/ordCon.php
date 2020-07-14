<?php

$dsn = "mysql:host=pixiangwens-MacBook-Pro.local;port=3306;dbname=G4_nexpos;charset=utf8";
	$user = "root";
	$password = "6316444939";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    $pdo = new PDO( $dsn, $user, $password, $options); 
    
?>