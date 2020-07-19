<?php

try{
    $dsn = "mysql:host=localhost;post=3306;dbname=g4_nexpos;charset=utf8";
    $user = "root";
    $password = "1u3ru894jo4SPUR";
    $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    $pdo = new PDO($dsn, $user, $password, $options);

    $sql = "SELECT TAB_NAME,TAB_SHOW
            FROM   tabstat;";
    $Select_sql = $pdo->query($sql);
    $SelectArr = array();
    while($row = $Select_sql->fetch(PDO::FETCH_ASSOC)){
        $SelectArr[] = $row;                   
    }
    
    echo json_encode($SelectArr);


}catch (PDOException $e){
    echo $e->getMessage();
}


?>