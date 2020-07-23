<?php

$proManageItemInputData = json_decode($_POST['proManageItemInputData']);
try{
	// $dsn = "mysql:host=localhost;port=3306;dbname=G4_nexpos;charset=utf8";
	// $user = "root";
	// $password = "lily12345";
	// $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO( $dsn, $user, $password, $options); 


  // require_once("generalConnectDB.php");
  require_once("ordCon.php");
  
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
  echo "<script> alert('送出成功');
      location.href='../proManageItem.html'
</script>" ;

  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
