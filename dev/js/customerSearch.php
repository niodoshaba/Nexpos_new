<?php 

try{ 
    require_once("ordCon.php");
    // $dsn = "mysql:host=localhost;post=3306;dbname=g4_nexpos;charset=utf8";
    // $user = "root";
    // $password = "1u3ru894jo4SPUR";
    // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    // $pdo = new PDO($dsn, $user, $password, $options);
    
    $cusPhone = $_POST["customer"];   

    // //搜尋會員
    $customer_sql = "SELECT CUS_PHONE,CUS_ID,CUS_LAST,CUS_GEN,CUS_POINT 
                     FROM   customer
                     WHERE  CUS_PHONE = '$cusPhone' AND CUS_ID = 1;";
    
    $customer = $pdo->query($customer_sql);
    $customerArr = array();
    while($row = $customer->fetch(PDO::FETCH_ASSOC)){
        $customerArr = $row;
    }

    echo json_encode($customerArr);
    
    }catch (PDOException $e){
        echo $e->getMessage();

    }


?>