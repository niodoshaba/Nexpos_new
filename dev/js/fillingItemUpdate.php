<?php
$fillingItemUpdateData = json_decode($_POST['fillingItemUpdateData']);

try{
  require_once("generalConnectDB.php");
   
  
  $fillingItemName = $fillingItemUpdateData->fillingItemName;
  $fillingItemPrice = $fillingItemUpdateData->fillingItemPrice;
  $fillingItemOnOff = $fillingItemUpdateData->fillingItemOnOff;

  //update data to db
  $sql = "UPDATE FILLING_ITEM
          SET FILLING_ITEM_NAME = '$fillingItemName',FILLING_ITEM_PRICE = '$fillingItemPrice', FILLING_ITEM_ONOFF = '$fillingItemOnOff' 
          WHERE FILLING_ITEM_NAME = '$fillingItemName';";

  $fillingItemStatus = $pdo->prepare( $sql );
  $fillingItemStatus->execute();

  echo "<script> alert('送出成功');
  location.href='../fillingItem.html'
</script>" ;

}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
