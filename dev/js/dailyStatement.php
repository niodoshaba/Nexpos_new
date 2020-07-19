<?php
session_start();

try{
  $dsn = "mysql:host=localhost; port=3306; dbname=G4_nexpos; charset=utf8";
  $user = "root";
  $password = "root";
  $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  $pdo = new PDO($dsn, $user, $password, $options);

  //抓出日結資訊
  $sql = "SELECT A1.ORDER_NO OrderNo, A1.ORDER_DATE OrderDate, A1.ORDER_INNOUT InNOut, A2.PAY_METHOD PayMethod, A1.ORDER_TTL_PRICE Price
          FROM ORDER_LIST A1, PAY A2
          WHERE A1.PAY_NO = A2.PAY_NO
          AND ORDER_DATE = CURDATE();" ; 

  $DailyOrder = $pdo->query($sql);
  $DailyOrder_json = array();
  while($row = $DailyOrder->fetch(PDO::FETCH_ASSOC)){
        $DailyOrder_json[] = $row;
  }
  echo json_encode($DailyOrder_json, JSON_UNESCAPED_UNICODE);

}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
