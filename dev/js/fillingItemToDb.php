<?php
$fillingItemInputData = json_decode($_POST['fillingItemInputData']);
try{
	require_once("generalConnectDB.php");
   
  
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
  echo "<script> alert('送出成功');
  location.href='../fillingItem.html'
</script>" ;

  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
