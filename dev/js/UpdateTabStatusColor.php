<?php

$tabStaInputData = json_decode($_POST['tabStaInputData']);
try{
  $dsn = "mysql:host=localhost; port=3306; dbname=G4_nexpos; cahrest=utf8;";
  $user = "root";
  $password = "95123654";
  $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  $pdo = new PDO($dsn, $user, $password,$options);

  $tabStaNo = $tabStaInputData->tabStaNo;
  $tabStaType = $tabStaInputData->tabStaType;
  $tabStaName = $tabStaInputData->tabStaName;

  //更新當日可預約人數
  $sql = "UPDATE  tabstat 
          SET     TAB_SHOW = '$tabStaType' , TAB_NAME = '$tabStaName'  
          WHERE   TAB_STAT_NO = '$tabStaNo'";


$emp = $pdo->prepare($sql);
$emp->execute();

header("location:../tableStatus.html");//直接跳轉到這頁

}catch(PDOException $e){
echo "錯誤行號", $e->getLine(), "<br>";
echo "錯誤原因", $e->getMessage();
}
?>

<!-- WHERE   DAILY_DATE = '$resRuledate' -->