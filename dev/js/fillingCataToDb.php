<?php

$fillingInputData = json_decode($_POST['fillingInputData']);
try{
	// $dsn = "mysql:host=localhost;port=3306;dbname=G4_nexpos;charset=utf8";
	// $user = "root";
	// $password = "lily12345";
	// $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO( $dsn, $user, $password, $options); 

  // require_once("generalConnectDB.php");
  require_once("ordCon.php");
  

 
  $fillingCataName =$fillingInputData->fillingCataName;
  $fillingCataOnOff = $fillingInputData->fillingCataOnOff;
  


  //send data to db
  $sql = "INSERT INTO FILLING_CATA(FILLING_CATA_NAME,FILLING_CATA_ONOFF) 
          VALUES ('$fillingCataName','$fillingCataOnOff');";

  $fillingCataStatus = $pdo->prepare( $sql );
  $fillingCataStatus->execute();
  
  //同時重整頁面
  header("location= ../fillingCata.html");

  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>
