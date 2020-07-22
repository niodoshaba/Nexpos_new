<?php
session_start();

$idPswInputData = json_decode($_POST['idPswInputData']);
try{
  // $dsn = "mysql:host=localhost; port=8889; dbname=G4_nexpos; cahrest=utf8;";
  // $user = "root";
  // $password = "lily12345";
  // $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION);
  // $pdo = new PDO($dsn, $user, $password,$options);


  // require_once("generalConnectDB.php");
  require_once("ordCon.php");
  
  $CUS_LAST = $idPswInputData->CUS_LAST;
  $CUS_FIRST = $idPswInputData->CUS_FIRST;
  $CUS_GEN = $idPswInputData->CUS_GEN;
  $CUS_BIRTH = $idPswInputData->CUS_BIRTH;
  $CUS_PHONE = $idPswInputData->CUS_PHONE;
  $CUS_EMAIL = $idPswInputData->CUS_EMAIL;
  $CUS_POINT = $idPswInputData->CUS_POINT;
  $CUS_ID = $idPswInputData->CUS_ID;
  $CUS_STATE = $idPswInputData->CUS_STATE;

  $sql = "INSERT INTO CUSTOMER (CUS_LAST, CUS_FIRST, CUS_GEN, CUS_BIRTH, CUS_PHONE, CUS_EMAIL, CUS_POINT, CUS_ID, CUS_STATE)
          VALUES ('$CUS_LAST', '$CUS_FIRST', '$CUS_GEN', '$CUS_BIRTH', '$CUS_PHONE', '$CUS_EMAIL','$CUS_POINT', '$CUS_ID', '$CUS_STATE');" ;

  $emp = $pdo->prepare($sql);
  $emp->execute();

  header("location:../memInfo.html");//直接跳轉到這頁
  
}catch(PDOException $e){
  echo "錯誤行號", $e->getLine(), "<br>";
  echo "錯誤原因", $e->getMessage();
}
?>