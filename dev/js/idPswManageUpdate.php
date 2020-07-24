<?php

$idPswUpdateData = json_decode($_POST['idPswUpdateData']);

try{
  require_once("generalConnectDB.php");
   

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