<?php
$proItemUpdateData = json_decode($_POST['proItemUpdateData']);

try{
    // $dsn = "mysql:host=localhost;port=3306;dbname=G4_nexpos;charset=utf8";
    // $user = "root";
    // $password = "lily12345";
    // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    // $pdo = new PDO( $dsn, $user, $password, $options); 

    require_once("generalConnectDB.php");
    // require_once("ordCon.php");
  
 
  $proItemName = $proItemUpdateData->proItemName;
  $proItemPrice = $proItemUpdateData->proItemPrice;
  $proItemOnOff = $proItemUpdateData->proItemOnOff;

  //update data to db
  $sql = "UPDATE PRODUCT_ITEM
          SET PRO_ITEM_NAME = '$proItemName',PRO_ITEM_PRICE = '$proItemPrice', PRO_ITEM_ONOFF = '$proItemOnOff' 
          WHERE PRO_ITEM_Name = '$proItemName';";


  $proItemStatus = $pdo->prepare( $sql );
  $proItemStatus->execute();

}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
