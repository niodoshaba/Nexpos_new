<?php
$proItemUpdateData = json_decode($_POST['proItemUpdateData']);

try{
  require_once("generalConnectDB.php");
  
 
  $proItemName = $proItemUpdateData->proItemName;
  $proItemPrice = $proItemUpdateData->proItemPrice;
  $proItemOnOff = $proItemUpdateData->proItemOnOff;

  //update data to db
  $sql = "UPDATE PRODUCT_ITEM
          SET PRO_ITEM_NAME = '$proItemName',PRO_ITEM_PRICE = '$proItemPrice', PRO_ITEM_ONOFF = '$proItemOnOff' 
          WHERE PRO_ITEM_Name = '$proItemName';";


  $proItemStatus = $pdo->prepare( $sql );
  $proItemStatus->execute();
 
  echo "<script> alert('送出成功');
  location.href='../proManageItem.html'
</script>" ;

}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
