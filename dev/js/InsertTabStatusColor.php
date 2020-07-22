<?php

$tabStaInputData = json_decode($_POST['tabStaInputData']);
try{
  // $dsn = "mysql:host=localhost; port=3306; dbname=G4_nexpos; cahrest=utf8;";
  // $user = "root";
  // $password = "95123654";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO($dsn, $user, $password,$options);

  // require_once("generalConnectDB.php");
  require_once("ordCon.php");

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