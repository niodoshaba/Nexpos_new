<?php

$tabStaInputData = json_decode($_POST['tabStaInputData']);
try{
  require_once("generalConnectDB.php");
   
  
  $tabStaType = $tabStaInputData->tabStaType;
  $tabStaName = $tabStaInputData->tabStaName;


  $sql = "INSERT INTO tabstat (TAB_SHOW,TAB_NAME)
          VALUES ('$tabStaType', '$tabStaName');" ;

  $emp = $pdo->prepare($sql);
  $emp->execute();

  header("location:../tableStatus.html");//直接跳轉到這頁
  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>