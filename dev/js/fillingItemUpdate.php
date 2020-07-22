<?php
$fillingItemUpdateData = json_decode($_POST['fillingItemUpdateData']);

try{
    // $dsn = "mysql:host=localhost;port=3306;dbname=G4_nexpos;charset=utf8";
    // $user = "root";
    // $password = "lily12345";
    // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    // $pdo = new PDO( $dsn, $user, $password, $options); 


    require_once("generalConnectDB.php");
    // require_once("ordCon.php");
  
  $fillingItemName = $fillingItemUpdateData->fillingItemName;
  $fillingItemPrice = $fillingItemUpdateData->fillingItemPrice;
  $fillingItemOnOff = $fillingItemUpdateData->fillingItemOnOff;

  //update data to db
  $sql = "UPDATE FILLING_ITEM
          SET FILLING_ITEM_NAME = '$fillingItemName',FILLING_ITEM_PRICE = '$fillingItemPrice', FILLING_ITEM_ONOFF = '$fillingItemOnOff' 
          WHERE FILLING_ITEM_NAME = '$fillingItemName';";

  $fillingItemStatus = $pdo->prepare( $sql );
  $fillingItemStatus->execute();

}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
