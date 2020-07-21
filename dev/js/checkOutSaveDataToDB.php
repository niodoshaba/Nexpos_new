<?php 

try{
    // $dsn = "mysql:host=localhost;post=3306;dbname=g4_nexpos;charset=utf8";
    // $user = "root";
    // $password = "1u3ru894jo4SPUR";
    // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    // $pdo = new PDO($dsn, $user, $password, $options);


    // require_once("generalConnectDB.php");
    require_once("ordCon.php");

    $orderListData = $_POST["orderList"];

    
    $bonusRule_sql = "INSERT INTO order_list 
                      VALUES ($ORDER_NO , $CUS_PHONE_NUMBER, $PAY_NO, $EMP_NO, $BONUS_NAME,
                              $ORDER_FEEDBACK, $ORDER_TAX_ID, $ORDER_DEVICE_NO, $ORDER_INNOUT,
                              $ORDER_NUM, $ORDER_TTL_PRICE, $ORDER_DATE  
                      );";

    // $bonusRule = $pdo->query($bonusRule_sql);
    // $bonusRuleArr = array();
    // while($pdoRow = $bonusRule->fetch(PDO::FETCH_ASSOC)){
    // $bonusRuleArr[] = $pdoRow;
    // }
    // $sendBackbonusRule = array_pop($bonusRuleArr[0]); 

    // print_r($sendBackbonusRule);

}catch (PDOException $e){
    echo $e->getMessage();

}






?>