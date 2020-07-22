<?php 

try{
    // $dsn = "mysql:host=localhost;post=3306;dbname=g4_nexpos;charset=utf8";
    // $user = "root";
    // $password = "lily12345";
    // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    // $pdo = new PDO($dsn, $user, $password, $options);


   // require_once("generalConnectDB.php");
    require_once("ordCon.php");


    $orderListData = json_decode($_POST["orderList"]);

    $ORDER_NO = $orderListData->ORDER_NO;
    $CUS_PHONE_NUMBER = $orderListData->CUS_PHONE;
    $PAY_NO = $orderListData->PAY_NO;
    $EMP_NO = $orderListData->EMP_NO;
    $BONUS_NAME = $orderListData->BONUS_NAME;
    $ORDER_TAX_ID = $orderListData->ORDER_TAX_ID;
    $ORDER_DEVICE_NO = $orderListData->ORDER_DEVICE_NO;
    $ORDER_INNOUT = $orderListData->ORDER_INNOUT;
    $ORDER_NUM = $orderListData->ORDER_NUM;
    $ORDER_TTL_PRICE = $orderListData->ORDER_TTL_PRICE;
    $ORDER_DATE = $orderListData->ORDER_DATE;

    echo json_encode($orderListData);
    // $bonusRule_sql = "INSERT INTO order_list 
    //                   VALUES ($ORDER_NO , $CUS_PHONE_NUMBER, $PAY_NO, $EMP_NO, $BONUS_NAME,
    //                           $ORDER_FEEDBACK, $ORDER_TAX_ID, $ORDER_DEVICE_NO, $ORDER_INNOUT,
    //                           $ORDER_NUM, $ORDER_TTL_PRICE, $ORDER_DATE  
    //                   );";

    // $bonusRule = $pdo->query($bonusRule_sql);
    // $bonusRuleArr = array();
    // while($pdoRow = $bonusRule->fetch(PDO::FETCH_ASSOC)){
    // $bonusRuleArr[] = $pdoRow;
    // }
    // $sendBackorderList = array_pop($orderListArr[0]); 

    // print_r($sendBackorderList);

}catch (PDOException $e){
    echo "錯誤行號" , $e->getLine(), "<br>";
    echo "錯誤原因", $e->getMessage();

}






?>
