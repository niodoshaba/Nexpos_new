<?php

$allDisUpdateData = json_decode($_POST['allDisUpdateData']);

try{
  require_once("generalConnectDB.php");
   

  
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