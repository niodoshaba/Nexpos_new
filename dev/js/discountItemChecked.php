<?php

$showcheckeditemNo = json_decode($_POST['showcheckeditemNo']);

try{
  require_once("generalConnectDB.php");
   

  // //抓出期間折扣被選取的商品資料
  $sql = "SELECT A1.DIS_NO, A2.PRO_ITEM_NO, A3.PRO_CATA_NAME, A2.PRO_ITEM_NAME, A2.PRO_ITEM_PRICE
          FROM DIS_ITEM A1, PRODUCT_ITEM A2, PRODUCT_CATA A3
          WHERE A2.PRO_CATA_NO = A3.PRO_CATA_NO
          AND A1.PRO_ITEM_NUMBER = A2.PRO_ITEM_NO
          AND A1.DIS_NO = '$showcheckeditemNo';" ;

  $discountChecked = $pdo->query($sql);
  $discountChecked_json = array();
  while($row = $discountChecked->fetch(PDO::FETCH_ASSOC)){
        $discountChecked_json[] = $row;
  }
  echo json_encode($discountChecked_json, JSON_UNESCAPED_UNICODE);
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>