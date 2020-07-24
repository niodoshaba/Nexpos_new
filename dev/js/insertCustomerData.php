<?php

try{

    $dsn = "mysql:host=localhost;post=3306;dbname=g4_nexpos;charset=utf8";
    $user = "root";
    $password = "1u3ru894jo4SPUR";
    $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    $pdo = new PDO($dsn, $user, $password, $options);

    $Data = $_POST["customerData"];

    $sql = "INSERT INTO `customer` (`CUS_PHONE`, `CUS_ID`, `CUS_STATE`)
            VALUES ('$Data', '0', '1');";      

    $insert = $pdo->prepare($sql);
    $insert->execute();


}catch(PDOException $e){

    echo $e->getMessage();

}




?>