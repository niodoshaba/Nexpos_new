<?php

$managerIdPswUpdate = json_decode($_POST['managerIdPswUpdate']);
try{
  require_once("generalConnectDB.php");
   
  
  $managerNo = $managerIdPswUpdate->managerNo;
  $managerTitle = $managerIdPswUpdate->managerTitle;
  $managerName = $managerIdPswUpdate->managerName;
  $managerPhone = $managerIdPswUpdate->managerPhone;
  $managerPsw = $managerIdPswUpdate->managerPsw;
  $managerStatus = $managerIdPswUpdate->managerStatus;

  $sql = "UPDATE EMP
          SET EMP_TITLE = '$managerTitle',EMP_NAME = '$managerName',EMP_PHONE = '$managerPhone',EMP_PWD = '$managerPsw',EMP_STAT = '$managerStatus'
          WHERE EMP_NO = '$managerNo';" ;

  $emp = $pdo->prepare($sql);
  $emp->execute();

  header("location:../managerIdPsw.html");//直接跳轉到這頁
  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>