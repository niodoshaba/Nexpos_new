<?php

try{
  // $dsn = "mysql:host=localhost; port=3306; dbname=G4_nexpos; cahrest=utf8;";
  // $user = "root";
  // $password = "root";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO($dsn, $user, $password,$options);
  require_once("generalConnectDB.php");

  //抓出期間折扣資料
  $sql = "SELECT DIS_NO, DIS_NAME, DIS_START, DIS_END, DIS_PCTALL
          FROM DISCOUNT
          WHERE DIS_CATA_NO = '1';" ;

  $discountItem = $pdo->query($sql);
  $discountItem_json = array();
  while($row = $discountItem->fetch(PDO::FETCH_ASSOC)){
        $discountItem_json[] = $row;
  }
  echo json_encode($discountItem_json, JSON_UNESCAPED_UNICODE);
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>