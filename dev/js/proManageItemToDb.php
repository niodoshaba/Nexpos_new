<?php

$proManageItemInputData = json_decode($_POST['proManageItemInputData']);
try{
	$dsn = "mysql:host=localhost;port=3306;dbname=G4_nexpos;charset=utf8";
	$user = "root";
	$password = "lily12345";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  $pdo = new PDO( $dsn, $user, $password, $options); 
  
  $proCataNo = $proManageItemInputData->proCataNo;
  $proItemName = $proManageItemInputData->proItemName;
  $proItemPrice = $proManageItemInputData->proItemPrice;
  $proItemOnOff = $proManageItemInputData->proItemOnOff;

  //send data to db
  $sql = "INSERT INTO PRODUCT_ITEM(PRO_CATA_NO,PRO_ITEM_NAME,PRO_ITEM_PRICE,PRO_ITEM_ONOFF) 
          VALUES ('$proCataNo','$proItemName','$proItemPrice','$proItemOnOff');";

  $proItemStatus = $pdo->prepare( $sql );
  $proItemStatus->execute();
  
  //同時重整頁面
  header("location= ../proManageItem.html");

  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
