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
  
  //電子支付總額
  $sqlElectro = "SELECT A2.PAY_METHOD PayMethod, SUM(A1.ORDER_TTL_PRICE) Price
                  FROM ORDER_LIST A1, PAY A2
                  WHERE A1.PAY_NO = A2.PAY_NO 
                  AND ORDER_DATE = CURDATE() AND PAY_METHOD = '電子支付'
                  GROUP BY A2.PAY_METHOD;" ;

  $DailyElectro= $pdo->query($sqlElectro);
  $DailyElectro_json = array();
  while($row = $DailyElectro->fetch(PDO::FETCH_ASSOC)){
        $DailyElectro_json[] = $row;
  }
  echo json_encode($DailyElectro_json, JSON_UNESCAPED_UNICODE);

}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>


