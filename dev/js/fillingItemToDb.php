<?php
$fillingItemInputData = json_decode($_POST['fillingItemInputData']);
try{
	$dsn = "mysql:host=localhost;port=3306;dbname=G4_nexpos;charset=utf8";
	$user = "root";
	$password = "lily12345";
	$options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  $pdo = new PDO( $dsn, $user, $password, $options); 
  
  $fillingCataNo = $fillingItemInputData->fillingCataNo;
  $fillingItemName = $fillingItemInputData->fillingItemName;
  $fillingItemPrice = $fillingItemInputData->fillingItemPrice;
  $fillingItemOnOff = $fillingItemInputData->fillingItemOnOff;


  //send data to db
  $sql = "INSERT INTO FILLING_ITEM(FILLING_CATA_NO,FILLING_ITEM_NAME,FILLING_ITEM_PRICE,FILLING_ITEM_ONOFF) 
          VALUES ('$fillingCataNo','$fillingItemName','$fillingItemPrice','$fillingItemOnOff');";

  $fillingItemStatus = $pdo->prepare( $sql );
  $fillingItemStatus->execute();
  
  //同時重整頁面
  header("location= ../fillingItem.html");

  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
