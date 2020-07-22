<?php

try{
  // $dsn = "mysql:host=localhost; port=3306; dbname=G4_nexpos; charset=utf8";
  // $user = "root";
  // $password = "root";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO($dsn, $user, $password, $options);
  
  // require_once("generalConnectDB.php");
  require_once("ordCon.php");
  

//抓出所有商品資訊
$sql = "SELECT A2.PRO_ITEM_NO ItemNo, A1.PRO_CATA_NAME CataName, A2.PRO_ITEM_NAME ItemName, A2.PRO_ITEM_PRICE ItemPrice
        FROM PRODUCT_CATA A1, PRODUCT_ITEM A2
        WHERE A1.PRO_CATA_NO = A2.PRO_CATA_NO;" ; 

  $product = $pdo->query($sql);
  $product_json = array();
  while($row = $product->fetch(PDO::FETCH_ASSOC)){
    $product_json[] = $row;
  }
  echo json_encode($product_json, JSON_UNESCAPED_UNICODE);

}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>




