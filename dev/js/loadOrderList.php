<?php

    try{
        $dsn = "mysql:host=localhost;post=3306;dbname=g4_nexpos;charset=utf8";
        $user = "root";
        $password = "1u3ru894jo4SPUR";
        $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
        $pdo = new PDO($dsn, $user, $password, $options);

        $sql = "SELECT ORDER_NO FROM `order_list` WHERE ORDER_NO=(SELECT MAX(ORDER_NO) FROM `order_list`);";

        $loadorderList = $pdo->prepare($sql);
        $loadorderList->execute();
        $data = $loadorderList->fetch(PDO::FETCH_ASSOC);
       
        echo json_encode($data);

    }catch (PDOException $e){
        echo $e->getMessage();
    }




?>