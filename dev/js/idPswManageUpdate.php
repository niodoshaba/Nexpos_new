<?php

$idPswUpdateData = json_decode($_POST['idPswUpdateData']);

try{
  // $dsn = "mysql:host=localhost; port=3306; dbname=G4_nexpos; cahrest=utf8;";
  // $user = "root";
  // $password = "root";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO($dsn, $user, $password,$options);
  

  // require_once("generalConnectDB.php");
  require_once("ordCon.php");

  $empNo = $idPswUpdateData->empNo;
  $empTitle = $idPswUpdateData->empTitle;
  $empName = $idPswUpdateData->empName;
  $empPhone = $idPswUpdateData->empPhone;
  $empPsw = $idPswUpdateData->empPsw;
  $empStatus = $idPswUpdateData->empStatus;

  $sql = "UPDATE EMP 
          SET EMP_TITLE = '$empTitle', EMP_NAME = '$empName', EMP_PHONE = '$empPhone', EMP_PWD = '$empPsw', EMP_STAT = '$empStatus'
          WHERE EMP_NO = '$empNo';" ;

  $emp = $pdo->prepare($sql);
  $emp->execute();
  
  header("location:../idPswManage.html");//直接跳轉到這頁
  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>