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

  // 總金額
  $sqlTotal = "SELECT SUM(ORDER_TTL_PRICE) TotalPrice FROM ORDER_LIST WHERE ORDER_DATE = CURDATE();" ;

  $DailyTotal = $pdo->query($sqlTotal);
  $DailyTotal_json = array();
  while($row = $DailyTotal->fetch(PDO::FETCH_ASSOC)){
        $DailyTotal_json[] = $row;
  }
  echo json_encode($DailyTotal_json, JSON_UNESCAPED_UNICODE);

}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>


