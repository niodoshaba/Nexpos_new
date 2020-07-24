<?php

try{
  require_once("generalConnectDB.php");
   
  

  //抓出全館折扣資料
  $sql = "SELECT DIS_NO, DIS_NAME, DIS_START, DIS_END, DIS_PCTALL
          FROM DISCOUNT
          WHERE DIS_CATA_NO = '0';" ;

  $discount = $pdo->query($sql);
  $discount_json = array();
  while($row = $discount->fetch(PDO::FETCH_ASSOC)){
        $discount_json[] = $row;
  }
  echo json_encode($discount_json, JSON_UNESCAPED_UNICODE);
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>