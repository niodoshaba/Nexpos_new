<?php

$managerInputData = json_decode($_POST['managerInputData']);
try{
  // $dsn = "mysql:host=localhost; port=3306; dbname=G4_nexpos; cahrest=utf8;";
  // $user = "root";
  // $password = "root";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO($dsn, $user, $password,$options);
  

  // require_once("generalConnectDB.php");
  require_once("ordCon.php");

  $managerTitle = $managerInputData->managerTitle;
  $managerName = $managerInputData->managerName;
  $managerPhone = $managerInputData->managerPhone;
  $managerPsw = $managerInputData->managerPsw;
  $managerStatus = $managerInputData->managerStatus;

  $sql = "INSERT INTO EMP (EMP_TITLE, EMP_NAME, EMP_PHONE, EMP_PWD, EMP_STAT)
          VALUES ('$managerTitle', '$managerName', '$managerPhone', '$managerPsw', '$managerStatus');" ;

  $emp = $pdo->prepare($sql);
  $emp->execute();

  header("location:../managerIdPsw.html");//直接跳轉到這頁
  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>