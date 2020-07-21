<?php

$allDisUpdateData = json_decode($_POST['allDisUpdateData']);

try{
  // $dsn = "mysql:host=localhost; port=3306; dbname=G4_nexpos; cahrest=utf8;";
  // $user = "root";
  // $password = "root";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO($dsn, $user, $password,$options);
  
  // require_once("generalConnectDB.php");
  require_once("ordCon.php");

  $allDisNo = $allDisUpdateData->allDisNo;
  $allDiscount = $allDisUpdateData->allDiscount * 0.1;
  $allDisName = $allDisUpdateData->allDisName;
  $allDisStart = $allDisUpdateData->allDisStart;
  $allDisEnd = $allDisUpdateData->allDisEnd;
  

  $sql = "UPDATE DISCOUNT 
          SET DIS_CATA_NO = '0' ,DIS_PCTALL = '$allDiscount', DIS_NAME = '$allDisName', DIS_START = '$allDisStart', DIS_END = '$allDisEnd'
          WHERE DIS_NO = '$allDisNo';" ;

  $emp = $pdo->prepare($sql);
  $emp->execute();
  
  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>