<?php

$idPswInputData = json_decode($_POST['idPswInputData']);
try{
  // $dsn = "mysql:host=localhost; port=3306; dbname=G4_nexpos; cahrest=utf8;";
  // $user = "root";
  // $password = "lily12345";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO($dsn, $user, $password,$options);
  
  // require_once("generalConnectDB.php");
  require_once("ordCon.php");

  $empTitle = $idPswInputData->empTitle;
  $empName = $idPswInputData->empName;
  $empPhone = $idPswInputData->empPhone;
  $empPsw = $idPswInputData->empPsw;
  $empStatus = $idPswInputData->empStatus;

  $sql = "INSERT INTO EMP (EMP_TITLE, EMP_NAME, EMP_PHONE, EMP_PWD, EMP_STAT)
          VALUES ('$empTitle', '$empName', '$empPhone', '$empPsw', '$empStatus');" ;

  $emp = $pdo->prepare($sql);
  $emp->execute();

  header("location:../idPswManage.html");//直接跳轉到這頁
  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>