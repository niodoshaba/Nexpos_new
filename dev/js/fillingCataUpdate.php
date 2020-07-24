<?php
$fillingUpdateData = json_decode($_POST['fillingUpdateData']);

try{
  require_once("generalConnectDB.php");
   

  $fillingCataNo = $fillingUpdateData->fillingCataNo;
  $fillingCataName = $fillingUpdateData->fillingCataName;
  $fillingCataOnOff = $fillingUpdateData->fillingCataOnOff;

  //update data to db
  $sql = "UPDATE FILLING_CATA
          SET FILLING_CATA_NAME = '$fillingCataName', FILLING_CATA_ONOFF = '$fillingCataOnOff' 
          WHERE FILLING_CATA_NO = '$fillingCataNo';";

  $fillingStatus = $pdo->prepare( $sql );
  $fillingStatus->execute();

  header("location:../fillingCata.html");

}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
