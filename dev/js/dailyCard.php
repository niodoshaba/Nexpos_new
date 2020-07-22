<?php
session_start();

try{
  // $dsn = "mysql:host=localhost; port=3306; dbname=G4_nexpos; charset=utf8";
  // $user = "root";
  // $password = "lily12345";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO($dsn, $user, $password, $options);

  // require_once("generalConnectDB.php");
  require_once("ordCon.php");
  
  //信用卡總額
  $sqlCard = "SELECT A2.PAY_METHOD PayMethod, SUM(A1.ORDER_TTL_PRICE) Price
              FROM ORDER_LIST A1, PAY A2
              WHERE A1.PAY_NO = A2.PAY_NO 
              AND ORDER_DATE = CURDATE() AND PAY_METHOD = '信用卡'
              GROUP BY A2.PAY_METHOD;" ;

  $DailyCard= $pdo->query($sqlCard);
  $DailyCard_json = array();
  while($row = $DailyCard->fetch(PDO::FETCH_ASSOC)){
        $DailyCard_json[] = $row;
  }
  echo json_encode($DailyCard_json, JSON_UNESCAPED_UNICODE);

}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>


