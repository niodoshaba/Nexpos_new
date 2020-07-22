<?php

$proInputData = json_decode($_POST['proInputData']);
try{
	// $dsn = "mysql:host=localhost;port=3306;dbname=G4_nexpos;charset=utf8";
	// $user = "root";
	// $password = "lily12345";
	// $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO( $dsn, $user, $password, $options); 
  
  require_once("generalConnectDB.php");
  // require_once("ordCon.php");

  $proCataName = $proInputData->proCataName;
  $proCataOnOff = $proInputData->proCataOnOff;

  //send data to db
  $sql = "INSERT INTO PRODUCT_CATA(PRO_CATA_NAME,PRO_CATA_ONOFF) 
          VALUES ('$proCataName','$proCataOnOff');";

  $proStatus = $pdo->prepare( $sql );
  $proStatus->execute();
  
  //同時重整頁面
  header("location= ../proManage.html");

}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
