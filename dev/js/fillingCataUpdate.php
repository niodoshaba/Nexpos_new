<?php
$fillingUpdateData = json_decode($_POST['fillingUpdateData']);

try{
    // $dsn = "mysql:host=localhost;port=3306;dbname=G4_nexpos;charset=utf8";
    // $user = "root";
    // $password = "lily12345";
    // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
    // $pdo = new PDO( $dsn, $user, $password, $options); 
    
    // require_once("generalConnectDB.php");
    require_once("ordCon.php");

  $fillingCataNo = $fillingUpdateData->fillingCataNo;
  $fillingCataName = $fillingUpdateData->fillingCataName;
  $fillingCataOnOff = $fillingUpdateData->fillingCataOnOff;

  //update data to db
  $sql = "UPDATE FILLING_CATA
          SET FILLING_CATA_NAME = '$fillingCataName', FILLING_CATA_ONOFF = '$fillingCataOnOff' 
          WHERE FILLING_CATA_NO = '$fillingCataNo';";

  $fillingStatus = $pdo->prepare( $sql );
  $fillingStatus->execute();
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
